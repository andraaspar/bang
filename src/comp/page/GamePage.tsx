import React from 'react'
import { AppStore } from '../../store/AppStore'
import { RowComp } from '../RowComp'

export interface GamePageProps {}

export function GamePage(props: GamePageProps) {
	const game = AppStore.useState((s) => s.game)
	return (
		<RowComp _isVertical _padding={20} _gap={20}>
			<div>Játék!</div>
		</RowComp>
	)
}
