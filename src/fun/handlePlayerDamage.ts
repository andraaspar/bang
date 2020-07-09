import { Card } from '../model/Card'
import { IPlayer } from '../model/IPlayer'
import { handleBeer } from './handleBeer'
import { GameContext } from './play'

export async function handlePlayerDamage(
	ctxt: GameContext,
	{
		player,
		damage,
	}: {
		player: IPlayer
		damage: number
	},
) {
	const { game, ui } = ctxt
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
				you: player === ctxt.player,
			})
			return
		} else {
			await ui.showSurvived({
				game,
				player,
				you: player === ctxt.player,
			})
		}
	}
}
