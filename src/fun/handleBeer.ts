import { Card } from '../model/Card'
import { IPlayer } from '../model/IPlayer'
import { GameContext } from './play'
import { putCardOnPile } from './putCardOnPile'

export async function handleBeer(
	ctxt: GameContext,
	{
		player,
		cardIndex,
		beersDrunk = 0,
	}: { player: IPlayer; cardIndex: number; beersDrunk?: number },
) {
	const { game, ui } = ctxt
	await ui.showDrinkABeer({
		game,
		player,
		you: player === ctxt.player,
		count: beersDrunk,
	})
	putCardOnPile(ctxt, {
		cardIndex: ctxt.player.cardsInHand.indexOf(Card.BEER),
		player: ctxt.player,
	})
	ctxt.player.health += 1
}
