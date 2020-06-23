export enum Route {
	Welcome = '/',
	MainMenu = '/menu/',
	Setup = '/setup/',
	Game = '/game/',
}

export function makeRouteWelcome() {
	return Route.Welcome
}

export function makeRouteMainMenu() {
	return Route.MainMenu
}

export function makeRouteSetup() {
	return Route.Setup
}

export function makeRouteGame() {
	return Route.Game
}
