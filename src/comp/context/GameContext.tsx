import { createContext } from 'react'
import { IGame } from '../../model/IGame'
import { TLoadable } from '../../model/TLoadable'

export const GameContext = createContext<{
	game: TLoadable<IGame | false>
	setGame: (game: TLoadable<IGame>) => void
}>({ game: null, setGame: () => {} })
