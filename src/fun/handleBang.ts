import { Card } from '../model/Card'
import { ColorValues } from '../model/Color'
import {
	BANG_SAVER_IN_HAND,
	BANG_SAVER_IN_PLAY,
	BARREL_SAVE_COLOR,
} from '../model/constants'
import { handlePlayerDamage } from './handlePlayerDamage'
import { pick } from './pick'
import { GameContext } from './play'
import { putCardFromPlayToPile } from './putCardFromPlayToPile'
import { putCardOnPile } from './putCardOnPile'

export async function handleBang(
	ctxt: GameContext,
	{ cardIndex }: { cardIndex: number },
) {
	const { game, ui, player } = ctxt

	putCardOnPile(ctxt, {
		player,
		cardIndex,
	})

	const targetPlayerIndex = await ui.selectBangTarget({ game })
	if (targetPlayerIndex == null) return
	const targetPlayer = game.players[targetPlayerIndex]

	if (targetPlayer.cardsPlayed.includes(Card.BARREL)) {
		await ui.showBarrel({ game, targetPlayer })
		const color = pick(ColorValues)
		if (color === BARREL_SAVE_COLOR) {
			await ui.showBarrelSave({ game, targetPlayer })
			return
		} else {
			await ui.showBarrelFail({ game, targetPlayer })
		}
	}

	const saversInHand = BANG_SAVER_IN_HAND.filter((card) =>
		targetPlayer.cardsInHand.includes(card),
	)
	const saversInPlay = BANG_SAVER_IN_PLAY.filter((card) =>
		targetPlayer.cardsPlayed.includes(card),
	)
	let saver: Card | null = null
	if (saversInHand.length || saversInPlay.length) {
		await ui.showTargetHasSavers({ game, targetPlayer })
		await ui.showPlayerIsUp({ game, player: targetPlayer })
		const action = await ui.selectSaveAction({
			game,
			targetPlayer,
		})
		if (action) {
			if (action.playCard) {
				const cardIndex = action.playCard.cardIndex
				saver = targetPlayer.cardsInHand[cardIndex]
				putCardOnPile(ctxt, { cardIndex, player: targetPlayer })
				await ui.showSaved({ game })
			} else if (action.useCard) {
				const cardIndex = action.useCard.cardIndex
				saver = targetPlayer.cardsPlayed[cardIndex]
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
		playerIndex: targetPlayerIndex,
		damage: 1,
	})
}
