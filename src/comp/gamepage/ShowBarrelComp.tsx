import React from 'react'
import { BARREL_SAVE_COLOR } from '../../model/constants'
import { IResolve } from '../../model/IResolve'
import { IMessageShowBarrel } from '../../model/message/IMessageShowBarrel'
import { centeredCss } from '../../style/centeredCss'
import { ColorComp } from '../ColorComp'

export interface ShowBarrelCompProps {
	_resolve: IResolve
	_message: IMessageShowBarrel
}

export function ShowBarrelComp(props: ShowBarrelCompProps) {
	const { _message } = props
	return (
		<>
			<h3 className={centeredCss}>
				{_message.targetPlayer.name} egy hordó mögött rejtőzik
			</h3>
			<p>
				Ha sikerül egy <ColorComp _color={BARREL_SAVE_COLOR} /> lapot
				felcsapnia, akkor a hordó megvédte őt.
			</p>
			<div className={centeredCss}>Értem</div>
		</>
	)
}
