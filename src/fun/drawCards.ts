import { Card } from '../model/Card'
import { IGame } from '../model/IGame'

export function drawCards(o: { game: IGame; count: number }): Card[] {
	const result: Card[] = []
	for (let i = 0; i < o.count; i++) {
		if (!o.game.deck.length) {
			if (!o.game.pile.length) {
				throw new Error(`[qcbxhb] Out of cards!`)
			}
			o.game.deck.push(...o.game.pile.splice(0, o.game.pile.length))
		}
		const index = Math.floor(Math.random() * o.game.deck.length)
		result.push(...o.game.deck.splice(index, 1))
	}
	return result
}
