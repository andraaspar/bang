import React from 'react'
import { Color, ColorColors, ColorNames } from '../model/Color'

export interface ColorCompProps {
	_color: Color
}

export function ColorComp(props: ColorCompProps) {
	return (
		<span style={{ color: ColorColors[props._color] }}>
			{ColorNames[props._color]}
		</span>
	)
}
