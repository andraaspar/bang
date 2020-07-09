import { IPlayer } from '../model/IPlayer'
import { draw } from './draw'
import { GameContext } from './play'

export async function handleDrawCards(
	ctxt: GameContext,
	{
		player,
		count,
	}: {
		player: IPlayer
		count: number
	},
) {
	const { game, ui } = ctxt
	const isYou = player === ctxt.player
	for (let cardIndex = 0; cardIndex < count; cardIndex++) {
		if (game.deck.length === 0) {
			if (game.pile.length === 0) {
				throw new Error(`[qcfmu7] Kifogytam a lapokból!`)
			}
			game.deck.push(...game.pile.splice(0, game.pile.length))
		}
		const card = draw(game.deck)
		player.cardsInHand.push(card)
		if (isYou) {
			await ui.showCardDrawn({ game, card })
		}
	}
	if (!isYou) {
		await ui.showCardsDrawn({ game, player, count })
	}
}
