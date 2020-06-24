import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
	IOutcome,
	IPlayUiRender,
	IPlayUiRenderArguments,
	play,
} from '../../fun/play'
import { makeRouteWelcome } from '../../model/routing'
import { AppStore } from '../../store/AppStore'
import { DynamiteDoesNotExplodeComp } from '../gamepage/DynamiteDoesNotExplodeComp'
import { DynamiteExplodesComp } from '../gamepage/DynamiteExplodesComp'
import { GameOverComp } from '../gamepage/GameOverComp'
import { NextPlayerGetsTheDynamiteComp } from '../gamepage/NextPlayerGetsTheDynamiteComp'
import { PlayerIsUp } from '../gamepage/PlayerIsUpComp'
import { ShowDynamiteComp } from '../gamepage/ShowDynamiteComp'
import { YouDrinkABeerComp } from '../gamepage/YouDrinkABeerComp'
import { YoureDeadComp } from '../gamepage/YoureDeadComp'
import { YouSurvivedComp } from '../gamepage/YouSurvivedComp'

export interface GamePageProps {}

enum Page {
	LOADING,
	GAME_OVER,
	PLAYER_IS_UP,
	SHOW_DYNAMITE,
	DYNAMITE_EXPLODES,
	YOU_DRINK_A_BEER,
	YOU_SURVIVED,
	YOURE_DEAD,
	DYNAMITE_DOES_NOT_EXPLODE,
	NEXT_PLAYER_GETS_THE_DYNAMITE,
}

export function GamePage(props: GamePageProps) {
	const history = useHistory()
	const game = AppStore.useState((s) => s.game)
	const [$page, set$page] = useState(Page.LOADING)
	const [$outcome, set$outcome] = useState<IOutcome | null>(null)
	const playResolve = useRef<(() => void) | null>(null)
	useEffect(() => {
		let isAborted = false
		function handleRender(page: Page): IPlayUiRender {
			return ({ game }: IPlayUiRenderArguments) =>
				new Promise<void>((resolve, reject) => {
					if (isAborted) return
					set$page(page)
					AppStore.update((s) => {
						s.game = JSON.parse(JSON.stringify(game))
					})
					playResolve.current = resolve
				})
		}
		;(async () => {
			if (game) {
				try {
					const outcome = await play({
						game: JSON.parse(JSON.stringify(game)),
						ui: {
							showPlayerIsUp: handleRender(Page.PLAYER_IS_UP),
							showDynamite: handleRender(Page.SHOW_DYNAMITE),
							showDynamiteExplodes: handleRender(Page.DYNAMITE_EXPLODES),
							showYouDrinkABeer: handleRender(Page.YOU_DRINK_A_BEER),
							showYouSurvived: handleRender(Page.YOU_SURVIVED),
							showYoureDead: handleRender(Page.YOURE_DEAD),
							showDynamiteDoesNotExplode: handleRender(
								Page.DYNAMITE_DOES_NOT_EXPLODE,
							),
							showNextPlayerGetsTheDynamite: handleRender(
								Page.NEXT_PLAYER_GETS_THE_DYNAMITE,
							),
						},
					})
					if (!isAborted) {
						set$page(Page.GAME_OVER)
						set$outcome(outcome)
						playResolve.current = () => {
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
	}, [game, history])
	if (game == null) {
		return <Redirect to={makeRouteWelcome()} />
	}
	const playerIndex = game.playerIndex
	const player = game.players[playerIndex]
	const nextPlayer = game.players[(playerIndex + 1) % game.players.length]
	switch ($page) {
		case Page.GAME_OVER:
			return (
				<GameOverComp _outcome={$outcome!} _resolve={playResolve.current!} />
			)
		case Page.PLAYER_IS_UP:
			return <PlayerIsUp _player={player} _resolve={playResolve.current!} />
		case Page.SHOW_DYNAMITE:
			return (
				<ShowDynamiteComp
					_color={player.dynamiteResolution!.color}
					_rank={player.dynamiteResolution!.rank}
					_resolve={playResolve.current!}
				/>
			)
		case Page.DYNAMITE_EXPLODES:
			return <DynamiteExplodesComp _resolve={playResolve.current!} />
		case Page.YOU_DRINK_A_BEER:
			return (
				<YouDrinkABeerComp
					_resolve={playResolve.current!}
					_count={player.dynamiteResolution!.beersDrunk + 1}
				/>
			)
		case Page.YOU_SURVIVED:
			return <YouSurvivedComp _resolve={playResolve.current!} />
		case Page.YOURE_DEAD:
			return <YoureDeadComp _resolve={playResolve.current!} />
		case Page.DYNAMITE_DOES_NOT_EXPLODE:
			return <DynamiteDoesNotExplodeComp _resolve={playResolve.current!} />
		case Page.NEXT_PLAYER_GETS_THE_DYNAMITE:
			return (
				<NextPlayerGetsTheDynamiteComp
					_nextPlayer={nextPlayer}
					_resolve={playResolve.current!}
				/>
			)
	}
	return <>...</>
}
