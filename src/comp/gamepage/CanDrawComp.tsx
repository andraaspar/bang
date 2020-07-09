import React from 'react'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface CanDrawCompProps {
	_resolve: IResolve
	_count: number
}

export function CanDrawComp(props: CanDrawCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Húzhatsz {props._count} lapot!</h3>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Rajta</button>
			</div>
		</>
	)
}
