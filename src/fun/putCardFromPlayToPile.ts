import { IPlayer } from '../model/IPlayer'
import { GameContext } from './play'

export function putCardFromPlayToPile(
	ctxt: GameContext,
	{
		player,
		cardIndex,
	}: {
		player: IPlayer
		cardIndex: number
	},
) {
	const card = player.cardsInPlay.splice(cardIndex, 1)[0]
	ctxt.game.pile.push(card)
}
