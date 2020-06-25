import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { centeredCss } from '../../style/centeredCss'

export interface DrinkABeerCompProps {
	_you: boolean
	_player: IPlayer
	_count: number
	_resolve: () => void
}

export function DrinkABeerComp(props: DrinkABeerCompProps) {
	if (props._you) {
		return (
			<>
				<h3 className={centeredCss}>
					{props._player.name} megiszik {props._count > 1 && `még`}egy sört!
				</h3>
				<p className={centeredCss}>Így próbál életben maradni.</p>
				{props._count === 3 && (
					<p className={centeredCss}>
						<em>A mindenit, három sör egy húzásra! Jól bírja!</em>
					</p>
				)}
				<div className={centeredCss}>
					<button onClick={props._resolve}>Értem</button>
				</div>
			</>
		)
	} else {
		return (
			<>
				<h3 className={centeredCss}>
					Megiszol {props._count > 1 && `még`}egy sört!
				</h3>
				<p className={centeredCss}>
					Szerencse hogy van nálad, így talán életben maradsz!
				</p>
				{props._count === 3 && (
					<p className={centeredCss}>
						<em>A mindenit, három sör egy húzásra! Jól bírod!</em>
					</p>
				)}
				<div className={centeredCss}>
					<button onClick={props._resolve}>Ez jól esett</button>
				</div>
			</>
		)
	}
}
