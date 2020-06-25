import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { centeredCss } from '../../style/centeredCss'

export interface DeadCompProps {
	_you: boolean
	_player: IPlayer
	_resolve: () => void
}

export function DeadComp(props: DeadCompProps) {
	if (props._you) {
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
	} else {
		return (
			<>
				<h3 className={centeredCss}>{props._player.name} meghalt!</h3>
				<div className={centeredCss}>
					<button onClick={props._resolve}>Nyugodjék békében</button>
				</div>
			</>
		)
	}
}
