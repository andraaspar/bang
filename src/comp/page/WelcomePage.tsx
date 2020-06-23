import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeRouteMainMenu } from '../../model/routing'
import { RowComp } from '../RowComp'

export interface WelcomePageProps {}

export function WelcomePage(props: WelcomePageProps) {
	const history = useHistory()
	return (
		<RowComp _isVertical _padding={20} _gap={20}>
			<h1 style={{ textAlign: 'center' }}>Bang!</h1>
			<div style={{ textAlign: 'center' }}>
				<button
					type='button'
					onClick={(e) => {
						history.push(makeRouteMainMenu())
					}}
				>
					Rajta
				</button>
			</div>
		</RowComp>
	)
}
