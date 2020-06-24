import React from 'react'
import { centeredCss } from '../../style/centeredCss'

export interface YouDrinkABeerCompProps {
	_count: number
	_resolve: () => void
}

export function YouDrinkABeerComp(props: YouDrinkABeerCompProps) {
	return (
		<>
			<h3 className={centeredCss}>
				Megiszol {props._count > 1 && `még`}egy sört!
			</h3>
			<p className={centeredCss}>
				Szerencse hogy van nálad, így talán megment a haláltól!
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
