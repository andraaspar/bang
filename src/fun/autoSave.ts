import { IGame } from '../model/IGame'
export function autoSave(game: IGame) {
	localStorage.setItem('AutoSave', JSON.stringify(game))
}
