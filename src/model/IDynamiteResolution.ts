import { Color } from './Color'
import { Rank } from './Rank'

export interface IDynamiteResolution {
	rank: Rank
	color: Color
	beersDrunk: number
	wasHealthAffected?: boolean
}
