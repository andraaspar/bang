import { Card } from '../model/Card'
import { ColorValues } from '../model/Color'
import {
	BANG_SAVER_IN_HAND,
	BANG_SAVER_IN_PLAY,
	BARREL_SAVE_COLOR,
} from '../model/constants'
import { IMessageBang } from '../model/message/IMessageBang'
import { IMessageShowBarrel } from '../model/message/IMessageShowBarrel'
import { MessageType } from '../model/message/MessageType'
import { handlePlayerDamage } from './handlePlayerDamage'
import { pick } from './pick'
import { GameContext } from './play'
import { putCardFromPlayToPile } from './putCardFromPlayToPile'
import { putCardOnPile } from './putCardOnPile'
import { withInterface } from './withInterface'

export async function handleBang(
	ctxt: GameContext,
	{ cardIndex }: { cardIndex: number },
) {
	const { game, ui, player } = ctxt

	putCardOnPile(ctxt, {
		player,
		cardIndex,
	})

	const targetPlayer = await ui.selectBangTarget({
		game,
		targets: game.players.filter((aPlayer) => aPlayer !== player),
	})
	if (targetPlayer == null) return

	for (const aPlayer of game.players) {
		aPlayer.messages.push(
			withInterface<IMessageBang>({
				type: MessageType.Bang,
				game,
				player,
				targetPlayer,
				youAreThePlayer: aPlayer === player,
				youAreTheTarget: aPlayer === targetPlayer,
			}),
		)
	}

	if (targetPlayer.cardsInPlay.includes(Card.BARREL)) {
		for (const aPlayer of game.players) {
			if (aPlayer === player || aPlayer === targetPlayer) {
				aPlayer.messages.push(
					withInterface<IMessageShowBarrel>({
						type: MessageType.ShowBarrel,
						game,
						player,
						targetPlayer,
						youAreThePlayer: aPlayer === player,
						youAreTheTarget: aPlayer === targetPlayer,
					}),
				)
			}
		}
		const color = pick(ColorValues)
		if (color === BARREL_SAVE_COLOR) {
			await ui.showBarrelSave({ game, targetPlayer })
			return
		} else {
			await ui.showBarrelFail({ game, targetPlayer, color })
		}
	}

	const saversInHand = BANG_SAVER_IN_HAND.filter((card) =>
		targetPlayer.cardsInHand.includes(card),
	)
	const saversInPlay = BANG_SAVER_IN_PLAY.filter((card) =>
		targetPlayer.cardsInPlay.includes(card),
	)
	let saver: Card | null = null
	if (saversInHand.length || saversInPlay.length) {
		await ui.showTargetHasSavers({ game, targetPlayer })
		await ui.showPlayerIsUp({ game, player: targetPlayer })
		const action = await ui.selectSaveAction({
			game,
			player,
			cardsInHand: targetPlayer.cardsInHand,
			cardsInPlay: targetPlayer.cardsInPlay,
		})
		if (action) {
			if (action.playCard) {
				const cardIndex = action.playCard.cardIndex
				saver = targetPlayer.cardsInHand[cardIndex]
				putCardOnPile(ctxt, { cardIndex, player: targetPlayer })
				await ui.showSaved({ game })
			} else if (action.useCard) {
				const cardIndex = action.useCard.cardIndex
				saver = targetPlayer.cardsInPlay[cardIndex]
				putCardFromPlayToPile(ctxt, { cardIndex, player: targetPlayer })
				await ui.showSaved({ game })
			}
		}
		await ui.showPlayerIsUp({ game, player })
	}
	if (saver != null) {
		await ui.showTargetIsSaved({ game, targetPlayer })
		return
	}

	await handlePlayerDamage(ctxt, {
		player: targetPlayer,
		damage: 1,
	})
}
