import React, { useState } from 'react'
import { Color } from '../../model/Color'
import {
	DYNAMITE_EXPLODE_COLOR,
	DYNAMITE_EXPLODE_RANK_MAX,
	DYNAMITE_EXPLODE_RANK_MIN,
} from '../../model/constants'
import { Rank } from '../../model/Rank'
import { centeredCss } from '../../style/centeredCss'
import { ColorComp } from '../ColorComp'
import { RankComp } from '../RankComp'

export interface ShowDynamiteCompProps {
	_color: Color
	_rank: Rank
	_resolve: () => void
}

export function ShowDynamiteComp(props: ShowDynamiteCompProps) {
	const [$showRank, set$showRank] = useState(false)
	const [$showColor, set$showColor] = useState(false)
	return (
		<>
			<h3 className={centeredCss}>Dinamit hullott az öledbe!</h3>
			<p className={centeredCss}>
				Fel kell csapnod egy lapot. Ha{' '}
				<ColorComp _color={DYNAMITE_EXPLODE_COLOR} />{' '}
				<RankComp _rank={DYNAMITE_EXPLODE_RANK_MIN} /> és{' '}
				<RankComp _rank={DYNAMITE_EXPLODE_RANK_MAX} /> közötti lapot kapsz, fel
				fog robbanni! Lássuk a lapod!
			</p>
			{$showColor && (
				<p className={centeredCss}>
					A lapod színe: <ColorComp _color={props._color} />
				</p>
			)}
			{$showRank && (
				<p className={centeredCss}>
					A lapod értéke: <RankComp _rank={props._rank} />
				</p>
			)}
			<div className={centeredCss}>
				<button
					onClick={() => {
						if (!$showColor) {
							set$showColor(true)
							if (props._color !== DYNAMITE_EXPLODE_COLOR) {
								set$showRank(true)
							}
						} else if (!$showRank) {
							set$showRank(true)
						} else {
							props._resolve()
						}
					}}
				>
					{$showColor && $showRank ? `Mi van rajta?` : `Értem`}
				</button>
			</div>
		</>
	)
}
