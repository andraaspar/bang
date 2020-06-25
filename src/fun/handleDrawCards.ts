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
	const { game, ui } = ctxt
	const player = game.players[playerIndex]
	for (let cardIndex = 0; cardIndex < count; cardIndex++) {
		if (game.deck.length === 0) {
			if (game.pile.length === 0) {
				throw new Error(`[qcfmu7] Kifogytam a lapokból!`)
			}
			game.deck.push(...game.pile.splice(0, game.pile.length))
		}
		player.cardsInHand.push(draw(game.deck))
		await ui.showCardDrawn({ game })
	}
}
