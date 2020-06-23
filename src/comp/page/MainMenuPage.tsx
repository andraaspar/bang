import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeRouteSetup } from '../../model/routing'
import { RowComp } from '../RowComp'

export interface MainMenuPageProps {}

export function MainMenuPage(props: MainMenuPageProps) {
	const history = useHistory()
	return (
		<RowComp _isVertical _padding={20} _gap={20}>
			<div style={{ textAlign: 'center' }}>
				<button
					type='button'
					onClick={(e) => {
						history.push(makeRouteSetup())
					}}
				>
					Kezdj új játékot
				</button>
			</div>
		</RowComp>
	)
}
