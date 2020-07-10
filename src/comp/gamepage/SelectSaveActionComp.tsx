import React from 'react'
import { getCardName } from '../../fun/getCardName'
import { IPlayCardOrUseCard } from '../../fun/play'
import { Card } from '../../model/Card'
import { IPlayer } from '../../model/IPlayer'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface SelectSaveActionCompProps {
	_player: IPlayer
	_cardsInHand: Card[]
	_cardsInPlay: Card[]
	_resolve: IResolve<IPlayCardOrUseCard | void>
}

export function SelectSaveActionComp(props: SelectSaveActionCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Mivel véded magad?</h3>
			{props._cardsInHand.map((card, cardIndex) => (
				<div key={cardIndex} className={centeredCss}>
					<button onClick={() => props._resolve({ playCard: { cardIndex } })}>
						{getCardName(card)}
					</button>
				</div>
			))}
			{props._cardsInPlay.map((card, cardIndex) => (
				<div key={cardIndex} className={centeredCss}>
					<button onClick={() => props._resolve({ useCard: { cardIndex } })}>
						{getCardName(card)}
					</button>
				</div>
			))}
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Semmivel</button>
			</div>
		</>
	)
}
