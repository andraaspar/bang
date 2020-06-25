import { Card } from '../model/Card'
import { handleBang } from './handleBang'
import { handleBeer } from './handleBeer'
import { handleDrawCards } from './handleDrawCards'
import { handleDynamite } from './handleDynamite'
import { GameContext } from './play'

export async function handleTurn(ctxt: GameContext) {
	const { game, ui, player } = ctxt

	if (player.health < 1) {
		return
	}

	await ui.showPlayerIsUp({ game, player })

	await handleDynamite(ctxt)
	if (player.health < 1) {
		return
	}

	await ui.showCanDraw({ game })
	await handleDrawCards(ctxt, {
		playerIndex: game.playerIndex,
		count: 2,
	})

	while (true) {
		const action = await ui.selectAction({ game })
		if (action && action.playCard) {
			const cardIndex = action.playCard.cardIndex
			const card = player.cardsInHand[cardIndex]
			switch (card) {
				case Card.BEER:
					await handleBeer(ctxt, { player, cardIndex })
					break
				case Card.BANG:
					await handleBang(ctxt, { cardIndex })
					break
			}
		}
	}
}
