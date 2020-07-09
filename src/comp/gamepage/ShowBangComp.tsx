import { hunRa } from 'magyar-rag'
import React from 'react'
import { IResolve } from '../../model/IResolve'
import { IMessageBang } from '../../model/message/IMessageBang'
import { centeredCss } from '../../style/centeredCss'

export interface ShowBangCompProps {
	_message: IMessageBang
	_resolve: IResolve
}

export function ShowBangComp(props: ShowBangCompProps) {
	const { _message } = props
	return (
		<>
			<h3 className={centeredCss}>Bang!</h3>
			{_message.youAreTheTarget ? (
				<p className={centeredCss}>{_message.player.name} rád lő!</p>
			) : _message.youAreThePlayer ? (
				<p className={centeredCss}>{hunRa(_message.targetPlayer.name)} lősz!</p>
			) : (
				<p className={centeredCss}>
					{_message.player.name} rálő {hunRa(_message.targetPlayer.name)}!
				</p>
			)}
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>
					{_message.youAreTheTarget ? `Affene` : `Rajta`}
				</button>
			</div>
		</>
	)
}
