import { DbStore, getDb } from '../db/db'
import { IGame } from '../model/IGame'

export async function autoSave(game: IGame) {
	const db = await getDb()
	await db.put(DbStore.Saves, { id: 'AutoSave', game })
}
