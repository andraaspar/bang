import { Card } from './Card'
import { Color } from './Color'
import { Rank } from './Rank'

export const PLAYERS_MIN = 4
export const PLAYERS_MAX = 7
export const DYNAMITE_EXPLODE_COLOR = Color.SPADES
export const DYNAMITE_EXPLODE_RANK_MIN = Rank.TWO
export const DYNAMITE_EXPLODE_RANK_MAX = Rank.NINE
export const DYNAMITE_DAMAGE = 3
export const BARREL_SAVE_COLOR = Color.HEARTS
export const BANG_SAVER_IN_PLAY = [
	Card.BIBLE,
	Card.IRON_PLATE,
	Card.SOMBRERO,
	Card.TEN_GALLON_HAT,
]
export const BANG_SAVER_IN_HAND = [Card.DODGE, Card.MISSED]
