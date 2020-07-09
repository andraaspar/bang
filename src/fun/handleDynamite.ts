import { Card } from '../model/Card'
import { ColorValues } from '../model/Color'
import {
	DYNAMITE_DAMAGE,
	DYNAMITE_EXPLODE_COLOR,
	DYNAMITE_EXPLODE_RANK_MAX,
	DYNAMITE_EXPLODE_RANK_MIN,
} from '../model/constants'
import { RankValues } from '../model/Rank'
import { handlePlayerDamage } from './handlePlayerDamage'
import { pick } from './pick'
import { GameContext } from './play'

export async function handleDynamite(ctxt: GameContext) {
	const { game, ui, player, nextPlayer } = ctxt
	if (player.cardsInPlay.includes(Card.DYNAMITE)) {
		const color = pick(ColorValues)
		const rank = pick(RankValues)
		await ui.showDynamite({ game, color, rank })
		const itExplodes =
			color === DYNAMITE_EXPLODE_COLOR &&
			rank >= DYNAMITE_EXPLODE_RANK_MIN &&
			rank <= DYNAMITE_EXPLODE_RANK_MAX
		if (itExplodes) {
			await ui.showDynamiteExplodes({ game })
			await handlePlayerDamage(ctxt, {
				player: player,
				damage: DYNAMITE_DAMAGE,
			})
		} else {
			await ui.showDynamiteDoesNotExplode({ game })
			player.cardsInPlay.splice(player.cardsInPlay.indexOf(Card.DYNAMITE), 1)
			nextPlayer.cardsInPlay.push(Card.DYNAMITE)
			await ui.showNextPlayerGetsTheDynamite({ game, nextPlayer })
		}
	}
}
