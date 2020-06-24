import React from 'react'
import { centeredCss } from '../../style/centeredCss'

export interface DynamiteDoesNotExplodeCompProps {
	_resolve: () => void
}

export function DynamiteDoesNotExplodeComp(
	props: DynamiteDoesNotExplodeCompProps,
) {
	return (
		<>
			<h3 className={centeredCss}>A dinamit nem robbant fel!</h3>
			<div className={centeredCss}>
				<button onClick={props._resolve}>Eldobom</button>
			</div>
		</>
	)
}
