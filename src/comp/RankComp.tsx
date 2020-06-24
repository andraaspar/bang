import React from 'react'
import { Rank, RankNames } from '../model/Rank'

export interface RankCompProps {
	_rank: Rank
}

export function RankComp(props: RankCompProps) {
	return <strong>{RankNames[props._rank]}</strong>
}
