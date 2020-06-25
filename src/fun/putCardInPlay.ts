import { IPlayer } from '../model/IPlayer'
import { GameContext } from './play'

export function putCardInPlay(
	ctxt: GameContext,
	{
		player,
		cardIndex,
	}: {
		player: IPlayer
		cardIndex: number
	},
) {
	const card = player.cardsInHand.splice(cardIndex, 1)[0]
	player.cardsPlayed.push(card)
}
