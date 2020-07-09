import { IGame } from '../IGame'
import { IPlayer } from '../IPlayer'
import { MessageType } from './MessageType'

export interface IMessageBang {
	type: MessageType.Bang
	game: IGame
	player: IPlayer
	targetPlayer: IPlayer
	youAreTheTarget: boolean
	youAreThePlayer: boolean
}
