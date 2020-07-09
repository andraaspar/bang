import React from 'react'
import { getCardName } from '../../fun/getCardName'
import { Card } from '../../model/Card'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface CardCompProps {
	_resolve: IResolve
	_card: Card
}

export function CardComp(props: CardCompProps) {
	return (
		<>
			<h3 className={centeredCss}>{getCardName(props._card)}</h3>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Jól van</button>
			</div>
		</>
	)
}
