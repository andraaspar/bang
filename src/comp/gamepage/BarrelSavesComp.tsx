import React from 'react'
import { BARREL_SAVE_COLOR } from '../../model/constants'
import { IPlayer } from '../../model/IPlayer'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'
import { ColorComp } from '../ColorComp'

export interface BarrelSavesCompProps {
	_resolve: IResolve
	_targetPlayer: IPlayer
}

export function BarrelSavesComp(props: BarrelSavesCompProps) {
	return (
		<>
			<h3 className={centeredCss}>
				{props._targetPlayer.name} a hordóját találod el!
			</h3>
			<p className={centeredCss}>
				Sajnos {props._targetPlayer.name} épp egy{' '}
				<ColorComp _color={BARREL_SAVE_COLOR} /> lapot csapott fel, így nem
				sérült meg.
			</p>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>Affene</button>
			</div>
		</>
	)
}
