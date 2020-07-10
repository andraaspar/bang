import { cloneDeepWith } from 'lodash'
import { TMessage } from '../model/message/TMessage'

export function finalizeMessage<T extends TMessage>(message: T): T {
	message.game = cloneDeepWith(message.game)
	for (const player of message.game.players) {
		player.messages = []
	}
	return message
}
