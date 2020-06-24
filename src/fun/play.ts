import { Card } from '../model/Card'
import { ColorValues } from '../model/Color'
import {
	DYNAMITE_DAMAGE,
	DYNAMITE_EXPLODE_COLOR,
	DYNAMITE_EXPLODE_RANK_MAX,
	DYNAMITE_EXPLODE_RANK_MIN,
} from '../model/constants'
import { IGame } from '../model/IGame'
import { IPlayer } from '../model/IPlayer'
import { RankValues } from '../model/Rank'
import { pick } from './pick'

export interface IPlayArguments {
	game: IGame
	ui: IPlayUi
}

export interface IPlayUiRender {
	(a: IPlayUiRenderArguments): Promise<void>
}

export interface IPlayUiRenderArguments {
	game: IGame
}

export interface IPlayUi {
	showPlayerIsUp: IPlayUiRender
	showDynamite: IPlayUiRender
	showDynamiteExplodes: IPlayUiRender
	showYouDrinkABeer: IPlayUiRender
	showYoureDead: IPlayUiRender
	showYouSurvived: IPlayUiRender
	showDynamiteDoesNotExplode: IPlayUiRender
	showNextPlayerGetsTheDynamite: IPlayUiRender
}

export interface IOutcome {
	game: IGame
	winners: IPlayer[]
}

export async function play({ game, ui }: IPlayArguments): Promise<IOutcome> {
	for (; true; game.round++) {
		const winners = game.players.filter((player) => player.health >= 1)
		if (winners.length <= 1) {
			return { game, winners }
		}

		for (; game.playerIndex < game.players.length; game.playerIndex++) {
			const player = game.players[game.playerIndex]

			if (player.health < 1) {
				continue
			}

			await ui.showPlayerIsUp({ game })

			const nextPlayer =
				game.players[(game.playerIndex + 1) % game.players.length]

			if (player.cardsPlayed.includes(Card.DYNAMITE)) {
				if (!player.dynamiteResolution) {
					player.dynamiteResolution = {
						color: pick(ColorValues),
						rank: pick(RankValues),
						beersDrunk: 0,
					}
				}
				const resolution = player.dynamiteResolution
				const color = resolution.color
				const rank = resolution.rank
				await ui.showDynamite({ game })
				const itExplodes =
					color === DYNAMITE_EXPLODE_COLOR &&
					rank >= DYNAMITE_EXPLODE_RANK_MIN &&
					rank <= DYNAMITE_EXPLODE_RANK_MAX
				if (itExplodes) {
					if (!resolution.wasHealthAffected) {
						await ui.showDynamiteExplodes({
							game,
						})
						player.health -= DYNAMITE_DAMAGE
						resolution.wasHealthAffected = true
					}
					if (player.health < 1) {
						if (player.cardsInHand.includes(Card.BEER)) {
							while (
								player.health < 1 &&
								player.cardsInHand.includes(Card.BEER)
							) {
								await ui.showYouDrinkABeer({ game })
								resolution.beersDrunk++
								player.cardsInHand.splice(
									player.cardsInHand.indexOf(Card.BEER),
									1,
								)
								player.health += 1
							}
							if (player.health === 1) {
								await ui.showYouSurvived({ game })
							}
						}
						if (player.health < 1) {
							await ui.showYoureDead({ game })
							continue
						}
					}
				} else {
					await ui.showDynamiteDoesNotExplode({
						game,
					})
					player.cardsPlayed.splice(
						player.cardsPlayed.indexOf(Card.DYNAMITE),
						1,
					)
					nextPlayer.cardsPlayed.push(Card.DYNAMITE)
					await ui.showNextPlayerGetsTheDynamite({ game })
				}
				player.dynamiteResolution = null
			}
		}
	}
}
