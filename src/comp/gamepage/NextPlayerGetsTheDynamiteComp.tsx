import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { centeredCss } from '../../style/centeredCss'

export interface NextPlayerGetsTheDynamiteCompProps {
	_nextPlayer: IPlayer
	_resolve: () => void
}

export function NextPlayerGetsTheDynamiteComp(
	props: NextPlayerGetsTheDynamiteCompProps,
) {
	return (
		<>
			<h3 className={centeredCss}>
				Sikerült átdobnod a dinamitot a következő játékosnak!
			</h3>
			<p className={centeredCss}>
				Most már <strong>{props._nextPlayer.name}</strong> örülhet neki.
			</p>
			<div className={centeredCss}>
				<button onClick={props._resolve}>Ha-ha</button>
			</div>
		</>
	)
}
