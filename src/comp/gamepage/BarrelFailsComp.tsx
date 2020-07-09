import React from 'react'
import { Color } from '../../model/Color'
import { BARREL_SAVE_COLOR } from '../../model/constants'
import { IPlayer } from '../../model/IPlayer'
import { IResolve } from '../../model/IResolve'
import { centeredCss } from '../../style/centeredCss'
import { ColorComp } from '../ColorComp'

export interface BarrelFailsCompProps {
	_resolve: IResolve
	_targetPlayer: IPlayer
	_color: Color
}

export function BarrelFailsComp(props: BarrelFailsCompProps) {
	return (
		<>
			<h3 className={centeredCss}>
				{props._targetPlayer.name} hordója mit sem ér!
			</h3>
			<p>
				Csak egy <ColorComp _color={BARREL_SAVE_COLOR} /> lap menthette volna
				meg, de ő <ColorComp _color={props._color} /> lapot csapott fel.
			</p>
			<div className={centeredCss}>
				<button onClick={() => props._resolve()}>He-he</button>
			</div>
		</>
	)
}
