import { IGame } from '../IGame'
import { IPlayer } from '../IPlayer'
import { MessageType } from './MessageType'

export interface IMessageShowBarrel {
	type: MessageType.ShowBarrel
	game: IGame
	player: IPlayer
	targetPlayer: IPlayer
	youAreThePlayer: boolean
	youAreTheTarget: boolean
}
