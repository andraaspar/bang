import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface CardsDrawnCompProps {
	_resolve: IResolve
	_player: IPlayer
	_count: number
}

export function CardsDrawnComp(props: CardsDrawnCompProps) {
	return (
		<>
			<h3 className={centeredCss}>
				{props._player.name} húzott {props._count} lapot
			</h3>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Értem</button>
			</div>
		</>
	)
}
