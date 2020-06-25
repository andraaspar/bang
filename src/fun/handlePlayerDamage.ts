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
	const player = ctxt.game.players[playerIndex]
	player.health -= damage
	if (player.health < 1) {
		let beersDrunk = 0
		while (player.health < 1 && player.cardsInHand.includes(Card.BEER)) {
			handleBeer(ctxt, {
				cardIndex: player.cardsInHand.indexOf(Card.BEER),
				beersDrunk,
			})
			beersDrunk++
		}
		if (player.health < 1) {
			await ctxt.ui.showDead(ctxt.game, {
				targetPlayerIndex: playerIndex,
			})
			return
		} else {
			await ctxt.ui.showSurvived(ctxt.game, {
				targetPlayerIndex: playerIndex,
			})
		}
	}
}
