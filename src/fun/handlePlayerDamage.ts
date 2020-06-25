import { Card } from '../model/Card'
import { handleBeer } from './handleBeer'
import { GameContext } from './play'

export async function handlePlayerDamage(
	ctxt: GameContext,
	{
		playerIndex,
		damage,
	}: {
		playerIndex: number
		damage: number
	},
) {
	const { game, ui } = ctxt
	const player = game.players[playerIndex]
	player.health -= damage
	if (player.health < 1) {
		let beersDrunk = 0
		while (player.health < 1 && player.cardsInHand.includes(Card.BEER)) {
			handleBeer(ctxt, {
				player: player,
				cardIndex: player.cardsInHand.indexOf(Card.BEER),
				beersDrunk,
			})
			beersDrunk++
		}
		if (player.health < 1) {
			await ui.showDead({
				game,
				player,
				you: playerIndex === game.playerIndex,
			})
			return
		} else {
			await ui.showSurvived({
				game,
				player,
				you: playerIndex === game.playerIndex,
			})
		}
	}
}
