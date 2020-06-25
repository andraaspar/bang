import { Card } from '../model/Card'
import { handleBang } from './handleBang'
import { handleBeer } from './handleBeer'
import { handleDrawCards } from './handleDrawCards'
import { handleDynamite } from './handleDynamite'
import { GameContext } from './play'

export async function handleTurn(ctxt: GameContext) {
	if (ctxt.player.health < 1) {
		return
	}

	await ctxt.ui.showPlayerIsUp(ctxt.game)

	await handleDynamite(ctxt)
	if (ctxt.player.health < 1) {
		return
	}

	await ctxt.ui.showCanDraw(ctxt.game)
	await handleDrawCards(ctxt, {
		playerIndex: ctxt.game.playerIndex,
		count: 2,
	})

	while (true) {
		const action = await ctxt.ui.selectAction(ctxt.game)
		if (action && action.playCard) {
			const cardIndex = action.playCard.cardIndex
			const card = ctxt.player.cardsInHand[cardIndex]
			switch (card) {
				case Card.BEER:
					await handleBeer(ctxt, { cardIndex })
					break
				case Card.BANG:
					await handleBang(ctxt, { cardIndex })
					break
			}
		}
	}
}
