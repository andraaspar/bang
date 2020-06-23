import { Store } from 'pullstate'
import { IGame } from '../model/IGame'

export interface IAppStore {
	game: IGame | null
}

export const AppStore = new Store<IAppStore>({
	game: JSON.parse(localStorage.getItem('AutoSave') ?? 'null') as IGame | null,
})

AppStore.subscribe(
	(s) => s.game,
	(game) => {
		localStorage.setItem('AutoSave', JSON.stringify(game))
	},
)
