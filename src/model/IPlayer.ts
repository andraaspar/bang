import { Card } from './Card'
import { Character } from './Character'
import { IDynamiteResolution } from './IDynamiteResolution'
import { Role } from './Role'

export interface IPlayer {
	name: string
	cardsInHand: Card[]
	cardsPlayed: Card[]
	cardsPlayedThisRound: Card[]
	health: number
	character: Character | null
	role: Role | null
	dynamiteResolution: IDynamiteResolution | null
	ai: boolean
}

export function makePlayer(o: { name: string; ai?: boolean }): IPlayer {
	return {
		name: o.name,
		role: null,
		character: null,
		health: 0,
		cardsInHand: [],
		cardsPlayed: [],
		cardsPlayedThisRound: [],
		dynamiteResolution: null,
		ai: o.ai ?? false,
	}
}
