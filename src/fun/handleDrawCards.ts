import { draw } from './draw'
import { GameContext } from './play'

export async function handleDrawCards(
	ctxt: GameContext,
	{
		playerIndex,
		count,
	}: {
		playerIndex: number
		count: number
	},
) {
	const player = ctxt.game.players[playerIndex]
	for (let cardIndex = 0; cardIndex < count; cardIndex++) {
		if (ctxt.game.deck.length === 0) {
			if (ctxt.game.pile.length === 0) {
				throw new Error(`[qcfmu7] Kifogytam a lapokból!`)
			}
			ctxt.game.deck.push(...ctxt.game.pile.splice(0, ctxt.game.pile.length))
		}
		player.cardsInHand.push(draw(ctxt.game.deck))
		await ctxt.ui.showCardDrawn(ctxt.game)
	}
}
