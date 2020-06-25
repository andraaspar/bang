import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { centeredCss } from '../../style/centeredCss'

export interface SurvivedCompProps {
	_you: boolean
	_player: IPlayer
	_resolve: () => void
}

export function SurvivedComp(props: SurvivedCompProps) {
	if (props._you) {
		return (
			<>
				<h3 className={centeredCss}>Túlélted!</h3>
				<p className={centeredCss}>Ezt megúsztad!</p>
				<div className={centeredCss}>
					<button onClick={props._resolve}>Éljen!</button>
				</div>
			</>
		)
	} else {
		return (
			<>
				<h3 className={centeredCss}>{props._player.name} túlélte!</h3>
				<div className={centeredCss}>
					<button onClick={props._resolve}>Affene</button>
				</div>
			</>
		)
	}
}
