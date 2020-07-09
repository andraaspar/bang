import { Card } from '../model/Card'
import { draw } from './draw'
import { handleBang } from './handleBang'
import { handleBeer } from './handleBeer'
import { handleDrawCards } from './handleDrawCards'
import { handleDynamite } from './handleDynamite'
import { GameContext } from './play'
import { showMessages } from './showMessages'

export async function handleTurn(ctxt: GameContext) {
	const { game, ui, player } = ctxt

	if (game.round === 0) {
		for (let i = 0; i < player.health; i++) {
			player.cardsInHand.push(draw(game.deck))
		}
		return
	}

	if (player.health < 1) {
		return
	}

	await ui.showPlayerIsUp({ game, player })

	await showMessages(ctxt, { player })

	await handleDynamite(ctxt)
	if (player.health < 1) {
		return
	}

	await ui.showCanDraw({ game, count: 2 })
	await handleDrawCards(ctxt, {
		player,
		count: 2,
	})

	while (true) {
		const action = await ui.selectAction({
			game,
			cardsInHand: player.cardsInHand,
			cardsInPlay: player.cardsInPlay,
		})
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
