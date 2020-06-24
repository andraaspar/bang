import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeRouteWelcome } from '../../model/routing'
import { centeredCss } from '../../style/centeredCss'
import { RowComp } from '../RowComp'

export interface UnknownPageProps {}

export function UnknownPage(props: UnknownPageProps) {
	const history = useHistory()
	return (
		<RowComp _isVertical _padding={20} _gap={20}>
			<div className={centeredCss}>Eltévedtem... :(</div>
			<div className={centeredCss}>
				<button
					onClick={() => {
						history.push(makeRouteWelcome())
					}}
				>
					Gyerünk innen
				</button>
			</div>
		</RowComp>
	)
}
