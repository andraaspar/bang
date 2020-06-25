import { Color } from '../model/Color'
import { IAction } from '../model/IAction'
import { IGame } from '../model/IGame'
import { IPlayer } from '../model/IPlayer'
import { Rank } from '../model/Rank'
import { autoSave } from './autoSave'
import { handleTurn } from './handleTurn'

export interface IPlayArguments {
	game: IGame
	ui: IPlayUi
}

export interface IPlayUiRender {
	(game: IGame, extra?: IPlayUiRenderExtra): Promise<IAction | undefined>
}

export interface IPlayUiRenderExtra {
	outcome?: IOutcome
	targetPlayerIndex?: number
	cardColor?: Color
	cardRank?: Rank
	beersDrunk?: number
}

export interface IPlayUi {
	showPlayerIsUp: IPlayUiRender
	showDynamite: IPlayUiRender
	showDynamiteExplodes: IPlayUiRender
	showDrinkABeer: IPlayUiRender
	showDead: IPlayUiRender
	showSurvived: IPlayUiRender
	showDynamiteDoesNotExplode: IPlayUiRender
	showNextPlayerGetsTheDynamite: IPlayUiRender
	showCanDraw: IPlayUiRender
	showCardDrawn: IPlayUiRender
	selectAction: IPlayUiRender
	selectBangTarget: IPlayUiRender
}

export interface IOutcome {
	game: IGame
	winners: IPlayer[]
}

export class GameContext {
	game: IGame
	ui: IPlayUi

	constructor({ game, ui }: IPlayArguments) {
		this.game = game
		this.ui = ui
	}

	get player() {
		return this.game.players[this.game.playerIndex]
	}

	get nextPlayer() {
		return this.game.players[
			(this.game.playerIndex + 1) % this.game.players.length
		]
	}
}

export async function play(p: IPlayArguments) {
	const ctxt = new GameContext(p)
	while (true) {
		await handleTurn(ctxt)

		const winners = ctxt.game.players.filter((player) => player.health >= 1)
		if (winners.length <= 1) {
			return { game: ctxt.game, winners }
		}

		ctxt.game.playerIndex =
			(ctxt.game.playerIndex + 1) % ctxt.game.players.length
		autoSave(ctxt.game)
	}
}
