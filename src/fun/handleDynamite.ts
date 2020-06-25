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
	if (ctxt.player.cardsPlayed.includes(Card.DYNAMITE)) {
		const color = pick(ColorValues)
		const rank = pick(RankValues)
		await ctxt.ui.showDynamite(ctxt.game)
		const itExplodes =
			color === DYNAMITE_EXPLODE_COLOR &&
			rank >= DYNAMITE_EXPLODE_RANK_MIN &&
			rank <= DYNAMITE_EXPLODE_RANK_MAX
		if (itExplodes) {
			await ctxt.ui.showDynamiteExplodes(ctxt.game)
			await handlePlayerDamage(ctxt, {
				playerIndex: ctxt.game.playerIndex,
				damage: DYNAMITE_DAMAGE,
			})
		} else {
			await ctxt.ui.showDynamiteDoesNotExplode(ctxt.game)
			ctxt.player.cardsPlayed.splice(
				ctxt.player.cardsPlayed.indexOf(Card.DYNAMITE),
				1,
			)
			ctxt.nextPlayer.cardsPlayed.push(Card.DYNAMITE)
			await ctxt.ui.showNextPlayerGetsTheDynamite(ctxt.game)
		}
	}
}
