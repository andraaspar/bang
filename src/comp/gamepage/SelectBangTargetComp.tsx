import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface SelectBangTargetCompProps {
	_targets: IPlayer[]
	_resolve: IResolve<IPlayer | void>
}

export function SelectBangTargetComp(props: SelectBangTargetCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Válassz célpontot!</h3>
			{props._targets.map((target) => (
				<div className={centeredCss}>
					<button onClick={() => props._resolve(target)}>{target.name}</button>
				</div>
			))}
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Mégse</button>
			</div>
		</>
	)
}
