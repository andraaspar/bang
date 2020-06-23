import React from 'react'
import { Route as RouteComp, Switch } from 'react-router-dom'
import { Route } from '../model/routing'
import { GamePage } from './page/GamePage'
import { MainMenuPage } from './page/MainMenuPage'
import { SetupPage } from './page/SetupPage'
import { WelcomePage } from './page/WelcomePage'

export interface AppCompProps {}

export function AppComp(props: AppCompProps) {
	return (
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
				<div>Eltévedtem... :(</div>
			</RouteComp>
		</Switch>
	)
}
