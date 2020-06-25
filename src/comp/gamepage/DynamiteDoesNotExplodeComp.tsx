import React from 'react'
import { IResolveAction } from '../../model/IResolveAction'
import { centeredCss } from '../../style/centeredCss'

export interface DynamiteDoesNotExplodeCompProps {
	_resolve: IResolveAction
}

export function DynamiteDoesNotExplodeComp(
	props: DynamiteDoesNotExplodeCompProps,
) {
	return (
		<>
			<h3 className={centeredCss}>A dinamit nem robbant fel!</h3>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Eldobom</button>
			</div>
		</>
	)
}
