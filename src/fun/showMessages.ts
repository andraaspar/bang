import { IPlayer } from '../model/IPlayer'
import { MessageType } from '../model/message/MessageType'
import { GameContext } from './play'

export async function showMessages(
	ctxt: GameContext,
	{ player }: { player: IPlayer },
) {
	const { ui } = ctxt
	while (player.messages.length) {
		const message = player.messages.shift()
		if (message) {
			switch (message.type) {
				case MessageType.Bang:
					await ui.showBang({
						game: message.game,
						message: message,
					})
					break
				case MessageType.ShowBarrel:
					await ui.showBarrel({
						game: message.game,
						message: message,
					})
					break
			}
		}
	}
}
