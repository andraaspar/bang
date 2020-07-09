import { IGame } from '../IGame'
import { IPlayer } from '../IPlayer'
import { MessageType } from './MessageType'

export interface IMessageCardDrawn {
	type: MessageType.CardDrawn
	game: IGame
	player: IPlayer
	drawer: IPlayer
	count: number
}
