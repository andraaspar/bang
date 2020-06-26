import { Color } from '../model/Color'
import { IGame } from '../model/IGame'
import { IPlayer } from '../model/IPlayer'
import { Rank } from '../model/Rank'
import { autoSave } from './autoSave'
import { handleTurn } from './handleTurn'

export interface IPlayArguments {
	game: IGame
	ui: IPlayUi
}

export interface IPlayUi {
	showPlayerIsUp(arg: { game: IGame; player: IPlayer }): Promise<void>
	showDynamite(arg: { game: IGame; color: Color; rank: Rank }): Promise<void>
	showDynamiteExplodes(arg: { game: IGame }): Promise<void>
	showDrinkABeer(arg: {
		game: IGame
		you: boolean
		player: IPlayer
		count: number
	}): Promise<void>
	showDead(arg: { game: IGame; you: boolean; player: IPlayer }): Promise<void>
	showSurvived(arg: {
		game: IGame
		you: boolean
		player: IPlayer
	}): Promise<void>
	showDynamiteDoesNotExplode(arg: { game: IGame }): Promise<void>
	showNextPlayerGetsTheDynamite(arg: {
		game: IGame
		nextPlayer: IPlayer
	}): Promise<void>
	showCanDraw(arg: { game: IGame }): Promise<void>
	showCardDrawn(arg: { game: IGame }): Promise<void>
	selectAction(arg: { game: IGame }): Promise<IPlayCardOrUseCard | void>
	selectBangTarget(arg: { game: IGame }): Promise<number>
	showBarrel(arg: { game: IGame; targetPlayer: IPlayer }): Promise<void>
	showBarrelSave(arg: { game: IGame; targetPlayer: IPlayer }): Promise<void>
	showBarrelFail(arg: { game: IGame; targetPlayer: IPlayer }): Promise<void>
	showTargetHasSavers(arg: {
		game: IGame
		targetPlayer: IPlayer
	}): Promise<void>
	selectSaveAction(arg: {
		game: IGame
		targetPlayer: IPlayer
	}): Promise<IPlayCardOrUseCard | void>
	showSaved(arg: { game: IGame }): Promise<void>
	showTargetIsSaved(arg: { game: IGame; targetPlayer: IPlayer }): Promise<void>
}

export interface IPlayCardOrUseCard {
	playCard?: { cardIndex: number }
	useCard?: { cardIndex: number }
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

export async function play(p: IPlayArguments): Promise<IOutcome> {
	const ctxt = new GameContext(p)
	while (true) {
		const winners = ctxt.game.players.filter((player) => player.health >= 1)
		if (winners.length <= 1) {
			return { game: ctxt.game, winners }
		}
		autoSave(ctxt.game)

		await handleTurn(ctxt)

		ctxt.game.playerIndex =
			(ctxt.game.playerIndex + 1) % ctxt.game.players.length
	}
}
