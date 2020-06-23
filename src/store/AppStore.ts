import { Store } from 'pullstate'
import { IGame } from '../model/IGame'

export interface IAppStore {
	game: IGame | null
}

export const AppStore = new Store<IAppStore>({
	game: null,
})
