import React from 'react'
import { centeredCss } from '../../style/centeredCss'

export interface YoureDeadCompProps {
	_resolve: () => void
}

export function YoureDeadComp(props: YoureDeadCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Meghaltál!</h3>
			<p className={centeredCss}>
				Kifogytál az életerőből, és a sörből is! Nyugodj békében.
			</p>
			<div className={centeredCss}>
				<button onClick={props._resolve}>Affene</button>
			</div>
		</>
	)
}
