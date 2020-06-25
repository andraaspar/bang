import React from 'react'
import { IPlayer } from '../../model/IPlayer'
import { centeredCss } from '../../style/centeredCss'

export interface PlayerIsUpCompProps {
	_player: IPlayer
	_resolve: () => void
}

export function PlayerIsUpComp(props: PlayerIsUpCompProps) {
	return (
		<>
			<div className={centeredCss}>{props._player.name}</div>
			<div className={centeredCss}>
				<button onClick={props._resolve}>Itt vagyok</button>
			</div>
		</>
	)
}
