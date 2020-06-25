import { Card } from './Card'
import { Character } from './Character'
import { Role } from './Role'

export interface IPlayer {
	ai: boolean
	name: string
	cardsInHand: Card[]
	cardsPlayed: Card[]
	health: number
	character: Character | null
	role: Role | null
}

export function makePlayer(o: { name: string; ai?: boolean }): IPlayer {
	return {
		ai: o.ai ?? false,
		name: o.name,
		role: null,
		character: null,
		health: 0,
		cardsInHand: [],
		cardsPlayed: [],
	}
}
