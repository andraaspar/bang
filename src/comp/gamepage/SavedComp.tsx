import React from 'react'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface SavedCompProps {
	_resolve: IResolve
}

export function SavedComp(props: SavedCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Megmenekültél!</h3>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Hurrá</button>
			</div>
		</>
	)
}
