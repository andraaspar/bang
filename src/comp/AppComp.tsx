import React, { useEffect, useMemo, useState } from 'react'
import { Route as RouteComp, Switch } from 'react-router-dom'
import { DbStore, getDb } from '../db/db'
import { IGame } from '../model/IGame'
import { Route } from '../model/routing'
import { TLoadable } from '../model/TLoadable'
import { GameContext } from './context/GameContext'
import { GamePage } from './page/GamePage'
import { MainMenuPage } from './page/MainMenuPage'
import { SetupPage } from './page/SetupPage'
import { UnknownPage } from './page/UnknownPage'
import { WelcomePage } from './page/WelcomePage'

export interface AppCompProps {}

export function AppComp(props: AppCompProps) {
	const [$game, set$game] = useState<TLoadable<IGame | false>>(null)
	const gameContextValue = useMemo(() => ({ game: $game, setGame: set$game }), [
		$game,
	])
	const [$gameLoadTrigger, set$gameLoadTrigger] = useState({})
	useEffect(() => {
		if ($game == null) {
			set$gameLoadTrigger({})
		}
	}, [$game])
	useEffect(() => {
		;(async () => {
			try {
				set$game(Date.now())
				const db = await getDb()
				const autoSave = await db.get(DbStore.Saves, 'AutoSave')
				set$game(autoSave?.game ?? false)
			} catch (e) {
				console.error(e)
				set$game(e + '')
			}
		})()
	}, [$gameLoadTrigger])
	return (
		<GameContext.Provider value={gameContextValue}>
			<Switch>
				<RouteComp path={Route.Game}>
					<GamePage />
				</RouteComp>
				<RouteComp path={Route.Setup}>
					<SetupPage />
				</RouteComp>
				<RouteComp path={Route.MainMenu}>
					<MainMenuPage />
				</RouteComp>
				<RouteComp path={Route.Welcome}>
					<WelcomePage />
				</RouteComp>
				<RouteComp path='*'>
					<UnknownPage />
				</RouteComp>
			</Switch>
		</GameContext.Provider>
	)
}
