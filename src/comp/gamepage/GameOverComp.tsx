import React from 'react'
import { getRoleName } from '../../fun/getRoleName'
import { joinList } from '../../fun/joinList'
import { IOutcome } from '../../fun/play'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'

export interface GameOverCompProps {
	_outcome: IOutcome
	_resolve: IResolve
}

export function GameOverComp(props: GameOverCompProps) {
	return (
		<>
			<h3 className={centeredCss}>Vége a játéknak!</h3>
			{props._outcome.winners.length === 1 && (
				<>
					<p className={centeredCss}>
						<strong>{props._outcome.winners[0].name}</strong> a{' '}
						<em>{getRoleName(props._outcome.winners[0].role!)}</em> győzött!
					</p>
					<p className={centeredCss}>
						A végső leszámolásban csak ő maradt életben.
					</p>
				</>
			)}
			{props._outcome.winners.length > 1 && (
				<>
					<p className={centeredCss}>
						<strong>
							{joinList(props._outcome.winners.map((winner) => winner.name))}
						</strong>{' '}
						a{' '}
						<em>
							{getRoleName(
								props._outcome.winners[props._outcome.winners.length - 1].role!,
							)}
						</em>{' '}
						győzött!
					</p>
				</>
			)}
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Jól van</button>
			</div>
		</>
	)
}
