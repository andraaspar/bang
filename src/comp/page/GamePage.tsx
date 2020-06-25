import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { IPlayUiRender, IPlayUiRenderExtra, play } from '../../fun/play'
import { IAction } from '../../model/IAction'
import { IResolveAction } from '../../model/IResolveAction'
import { makeRouteWelcome } from '../../model/routing'
import { AppStore } from '../../store/AppStore'
import { DeadComp } from '../gamepage/DeadComp'
import { DrinkABeerComp } from '../gamepage/DrinkABeerComp'
import { DynamiteDoesNotExplodeComp } from '../gamepage/DynamiteDoesNotExplodeComp'
import { DynamiteExplodesComp } from '../gamepage/DynamiteExplodesComp'
import { GameOverComp } from '../gamepage/GameOverComp'
import { NextPlayerGetsTheDynamiteComp } from '../gamepage/NextPlayerGetsTheDynamiteComp'
import { PlayerIsUp } from '../gamepage/PlayerIsUpComp'
import { ShowDynamiteComp } from '../gamepage/ShowDynamiteComp'
import { SurvivedComp } from '../gamepage/SurvivedComp'

export interface GamePageProps {}

enum Page {
	LOADING,
	GAME_OVER,
	PLAYER_IS_UP,
	SHOW_DYNAMITE,
	DYNAMITE_EXPLODES,
	DRINK_A_BEER,
	SURVIVED,
	DEAD,
	DYNAMITE_DOES_NOT_EXPLODE,
	NEXT_PLAYER_GETS_THE_DYNAMITE,
	CAN_DRAW,
	CARD_DRAWN,
	SELECT_ACTION,
	SELECT_BANG_TARGET,
}

interface IData extends IPlayUiRenderExtra {
	page?: Page
	resolve?: IResolveAction
}

export function GamePage(props: GamePageProps) {
	const history = useHistory()
	const game = AppStore.useState((s) => s.game)
	const [$initialGame] = useState(game)
	const dataRef = useRef<IData>({
		page: Page.LOADING,
	})
	useEffect(() => {
		let isAborted = false

		function handleRender(page: Page): IPlayUiRender {
			return (game, extra) =>
				new Promise<IAction | undefined>((resolve, reject) => {
					if (isAborted) return
					dataRef.current = { ...extra, page, resolve }
					AppStore.update((s) => {
						s.game = JSON.parse(JSON.stringify(game))
					})
				})
		}

		;(async () => {
			if ($initialGame) {
				try {
					const outcome = await play({
						game: JSON.parse(JSON.stringify($initialGame)),
						ui: {
							showPlayerIsUp: handleRender(Page.PLAYER_IS_UP),
							showDynamite: handleRender(Page.SHOW_DYNAMITE),
							showDynamiteExplodes: handleRender(Page.DYNAMITE_EXPLODES),
							showDrinkABeer: handleRender(Page.DRINK_A_BEER),
							showSurvived: handleRender(Page.SURVIVED),
							showDead: handleRender(Page.DEAD),
							showDynamiteDoesNotExplode: handleRender(
								Page.DYNAMITE_DOES_NOT_EXPLODE,
							),
							showNextPlayerGetsTheDynamite: handleRender(
								Page.NEXT_PLAYER_GETS_THE_DYNAMITE,
							),
							showCanDraw: handleRender(Page.CAN_DRAW),
							showCardDrawn: handleRender(Page.CARD_DRAWN),
							selectAction: handleRender(Page.SELECT_ACTION),
							selectBangTarget: handleRender(Page.SELECT_BANG_TARGET),
						},
					})
					if (!isAborted) {
						dataRef.current.page = Page.GAME_OVER
						dataRef.current.outcome = outcome
						dataRef.current.resolve = () => {
							history.push(makeRouteWelcome())
						}
					}
				} catch (e) {
					console.error(e)
				}
			}
		})()
		return () => {
			isAborted = true
		}
	}, [$initialGame, history])
	if (game == null) {
		return <Redirect to={makeRouteWelcome()} />
	}
	const playerIndex = game.playerIndex
	const player = game.players[playerIndex]
	const nextPlayer = game.players[(playerIndex + 1) % game.players.length]
	switch (dataRef.current.page) {
		case Page.GAME_OVER:
			return (
				<GameOverComp
					_outcome={dataRef.current.outcome!}
					_resolve={dataRef.current.resolve!}
				/>
			)
		case Page.PLAYER_IS_UP:
			return <PlayerIsUp _player={player} _resolve={dataRef.current.resolve!} />
		case Page.SHOW_DYNAMITE:
			return (
				<ShowDynamiteComp
					_color={dataRef.current.cardColor!}
					_rank={dataRef.current.cardRank!}
					_resolve={dataRef.current.resolve!}
				/>
			)
		case Page.DYNAMITE_EXPLODES:
			return <DynamiteExplodesComp _resolve={dataRef.current.resolve!} />
		case Page.DRINK_A_BEER:
			return (
				<DrinkABeerComp
					_you={dataRef.current.targetPlayerIndex === game.playerIndex}
					_player={game.players[dataRef.current.targetPlayerIndex!]}
					_count={dataRef.current.beersDrunk! + 1}
					_resolve={dataRef.current.resolve!}
				/>
			)
		case Page.SURVIVED:
			return (
				<SurvivedComp
					_you={dataRef.current.targetPlayerIndex === game.playerIndex}
					_player={game.players[dataRef.current.targetPlayerIndex!]}
					_resolve={dataRef.current.resolve!}
				/>
			)
		case Page.DEAD:
			return (
				<DeadComp
					_you={dataRef.current.targetPlayerIndex === game.playerIndex}
					_player={game.players[dataRef.current.targetPlayerIndex!]}
					_resolve={dataRef.current.resolve!}
				/>
			)
		case Page.DYNAMITE_DOES_NOT_EXPLODE:
			return <DynamiteDoesNotExplodeComp _resolve={dataRef.current.resolve!} />
		case Page.NEXT_PLAYER_GETS_THE_DYNAMITE:
			return (
				<NextPlayerGetsTheDynamiteComp
					_nextPlayer={nextPlayer}
					_resolve={dataRef.current.resolve!}
				/>
			)
	}
	return <>...</>
}
