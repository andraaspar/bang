import React from 'react'
import { centeredCss } from '../../style/centeredCss'

export interface YouSurvivedCompProps {
	_resolve: () => void
}

export function YouSurvivedComp(props: YouSurvivedCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Túlélted!</h3>
			<p className={centeredCss}>Ezt megúsztad!</p>
			<div className={centeredCss}>
				<button onClick={props._resolve}>Éljen!</button>
			</div>
		</>
	)
}
