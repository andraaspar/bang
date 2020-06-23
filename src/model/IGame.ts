import { repeatMake } from '../fun/repeatMake'
import { DECK } from '../model/DECK'
import { Card } from './Card'
import { IPlayer, makePlayer } from './IPlayer'

export interface IGame {
	round: number
	playerIndex: number
	players: IPlayer[]
	deck: Card[]
	pile: Card[]
}

export function makeGame(): IGame {
	return {
		round: 0,
		playerIndex: 0,
		deck: DECK.slice(),
		pile: [],
		players: repeatMake(
			(i) =>
				makePlayer({
					name: `${i + 1}. játékos`,
					ai: i > 0,
				}),
			7,
		),
	}
}
