import { handlePlayerDamage } from './handlePlayerDamage'
import { GameContext } from './play'

export async function handleBang(
	ctxt: GameContext,
	{ cardIndex }: { cardIndex: number },
) {
	const action = await ctxt.ui.selectBangTarget(ctxt.game)
	if (!action) return
	await handlePlayerDamage(ctxt, {
		playerIndex: action.targetPlayer!.playerIndex,
		damage: 1,
	})
}
