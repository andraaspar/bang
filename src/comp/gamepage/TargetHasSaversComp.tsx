import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface TargetHasSaversCompProps {
	_resolve: IResolve
	_targetPlayer: IPlayer
}

export function TargetHasSaversComp(props: TargetHasSaversCompProps) {
	return (
		<>
			<h3 className={centeredCss}>
				{props._targetPlayer.name} védekezési módot választhat
			</h3>
			<p className={centeredCss}>Vannak olyan lapjai, amelyek megóvhatják.</p>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Rajta</button>
			</div>
		</>
	)
}
