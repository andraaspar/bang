import React from 'react'
import { getCardName } from '../../fun/getCardName'
import { IPlayCardOrUseCard } from '../../fun/play'
import { Card } from '../../model/Card'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface SelectActionCompProps {
	_cardsInHand: Card[]
	_cardsInPlay: Card[]
	_resolve: IResolve<IPlayCardOrUseCard | void>
}

export function SelectActionComp(props: SelectActionCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Mit teszel?</h3>
			{props._cardsInHand.map((card, cardIndex) => (
				<div className={centeredCss}>
					<button onClick={() => props._resolve({ playCard: { cardIndex } })}>
						{getCardName(card)}
					</button>
				</div>
			))}
			{props._cardsInPlay.map((card, cardIndex) => (
				<div className={centeredCss}>
					<button onClick={() => props._resolve({ useCard: { cardIndex } })}>
						{getCardName(card)}
					</button>
				</div>
			))}
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Semmit</button>
			</div>
		</>
	)
}
