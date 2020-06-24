import React from 'react'
import { DYNAMITE_DAMAGE } from '../../model/constants'
import { centeredCss } from '../../style/centeredCss'

export interface DynamiteExplodesCompProps {
	_resolve: () => void
}

export function DynamiteExplodesComp(props: DynamiteExplodesCompProps) {
	return (
		<>
			<h3 className={centeredCss}>A dinamit felrobbant!</h3>
			<p className={centeredCss}>
				Veszítesz <strong>{DYNAMITE_DAMAGE}</strong> életerő pontot!
			</p>
			<div className={centeredCss}>
				<button onClick={props._resolve}>Affene</button>
			</div>
		</>
	)
}
