import { Card } from '../model/Card'
import { GameContext } from './play'
import { putCardOnPile } from './putCardOnPile'

export async function handleBeer(
	ctxt: GameContext,
	{ cardIndex, beersDrunk = 0 }: { cardIndex: number; beersDrunk?: number },
) {
	await ctxt.ui.showDrinkABeer(ctxt.game, {
		targetPlayerIndex: ctxt.game.playerIndex,
		beersDrunk,
	})
	await putCardOnPile(ctxt, {
		cardIndex: ctxt.player.cardsInHand.indexOf(Card.BEER),
		player: ctxt.player,
	})
	ctxt.player.health += 1
}
