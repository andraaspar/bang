import { Color } from './Color'
import { Rank } from './Rank'

export interface IDynamiteResolution {
	rank: Rank
	color: Color
	wasDynamiteShown?: boolean
	wasRankShown?: boolean
	wasColorShown?: boolean
	wasHealthAffected?: boolean
}
