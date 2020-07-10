import { DBSchema, IDBPDatabase, openDB } from 'idb'
import { IGame } from '../model/IGame'

export enum DbStore {
	Saves = 'Saves',
}

export interface IDbSchema extends DBSchema {
	[DbStore.Saves]: { key: string; value: { id: string; game: IGame } }
}

let db: IDBPDatabase<IDbSchema> | null = null

export async function getDb() {
	if (!db) {
		db = await openDB('bang', 1, {
			upgrade(db, ole, nu, t) {
				db.createObjectStore(DbStore.Saves, { keyPath: 'id' })
			},
		})
	}
	return db
}
