import { cloneDeep, isNumber, isObject, isString } from 'lodash'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { play } from '../../fun/play'
import { IGame } from '../../model/IGame'
import { makeRouteWelcome } from '../../model/routing'
import { centeredCss } from '../../style/centeredCss'
import { GameContext } from '../context/GameContext'
import { BarrelFailsComp } from '../gamepage/BarrelFailsComp'
import { BarrelSavesComp } from '../gamepage/BarrelSavesComp'
import { CanDrawComp } from '../gamepage/CanDrawComp'
import { CardComp } from '../gamepage/CardComp'
import { CardsDrawnComp } from '../gamepage/CardsDrawnComp'
import { DeadComp } from '../gamepage/DeadComp'
import { DrinkABeerComp } from '../gamepage/DrinkABeerComp'
import { DynamiteDoesNotExplodeComp } from '../gamepage/DynamiteDoesNotExplodeComp'
import { DynamiteExplodesComp } from '../gamepage/DynamiteExplodesComp'
import { GameOverComp } from '../gamepage/GameOverComp'
import { NextPlayerGetsTheDynamiteComp } from '../gamepage/NextPlayerGetsTheDynamiteComp'
import { PlayerIsUpComp } from '../gamepage/PlayerIsUpComp'
import { SavedComp } from '../gamepage/SavedComp'
import { SelectActionComp } from '../gamepage/SelectActionComp'
import { SelectBangTargetComp } from '../gamepage/SelectBangTargetComp'
import { SelectSaveActionComp } from '../gamepage/SelectSaveActionComp'
import { ShowBangComp } from '../gamepage/ShowBangComp'
import { ShowBarrelComp } from '../gamepage/ShowBarrelComp'
import { ShowDynamiteComp } from '../gamepage/ShowDynamiteComp'
import { SurvivedComp } from '../gamepage/SurvivedComp'
import { TargetHasSaversComp } from '../gamepage/TargetHasSaversComp'

export interface GamePageProps {}

export function GamePage(props: GamePageProps) {
	const history = useHistory()
	const { game, setGame } = useContext(GameContext)
	const [$initialGame, set$initialGame] = useState(game)
	if (isObject(game) && $initialGame == null) {
		set$initialGame(game)
	}
	const [$renderer, set$renderer] = useState<{
		render: () => ReactElement
	} | null>(null)
	useEffect(() => {
		let isAborted = false

		function setRenderer(game: IGame, render: () => ReactElement): void {
			if (isAborted) return
			setGame(cloneDeep(game))
			set$renderer({ render })
		}

		;(async () => {
			if (isObject($initialGame)) {
				try {
					const outcome = await play({
						game: cloneDeep($initialGame),
						ui: {
							showPlayerIsUp({ game, player }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<PlayerIsUpComp _player={player} _resolve={resolve} />
									))
								})
							},
							showDynamite({ game, color, rank }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<ShowDynamiteComp
											_color={color}
											_rank={rank}
											_resolve={resolve}
										/>
									))
								})
							},
							showDynamiteExplodes({ game }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<DynamiteExplodesComp _resolve={resolve} />
									))
								})
							},
							showDrinkABeer({ game, you, player, count }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<DrinkABeerComp
											_you={you}
											_player={player}
											_count={count}
											_resolve={resolve}
										/>
									))
								})
							},
							showSurvived({ game, you, player }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<SurvivedComp
											_you={you}
											_player={player}
											_resolve={resolve}
										/>
									))
								})
							},
							showDead({ game, you, player }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<DeadComp _you={you} _player={player} _resolve={resolve} />
									))
								})
							},
							showDynamiteDoesNotExplode({ game }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<DynamiteDoesNotExplodeComp _resolve={resolve} />
									))
								})
							},
							showNextPlayerGetsTheDynamite({ game, nextPlayer }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<NextPlayerGetsTheDynamiteComp
											_nextPlayer={nextPlayer}
											_resolve={resolve}
										/>
									))
								})
							},
							showCanDraw({ game, count }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<CanDrawComp _count={count} _resolve={resolve} />
									))
								})
							},
							showCardDrawn({ game, card }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<CardComp _card={card} _resolve={resolve} />
									))
								})
							},
							showCardsDrawn({ game, player, count }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<CardsDrawnComp
											_player={player}
											_count={count}
											_resolve={resolve}
										/>
									))
								})
							},
							selectAction({ game, cardsInHand, cardsInPlay }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<SelectActionComp
											_cardsInHand={cardsInHand}
											_cardsInPlay={cardsInPlay}
											_resolve={resolve}
										/>
									))
								})
							},
							selectBangTarget({ game, targets }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<SelectBangTargetComp
											_targets={targets}
											_resolve={resolve}
										/>
									))
								})
							},
							showBarrel({ game, message }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<ShowBarrelComp _message={message} _resolve={resolve} />
									))
								})
							},
							showBarrelFail({ game, targetPlayer, color }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<BarrelFailsComp
											_targetPlayer={targetPlayer}
											_color={color}
											_resolve={resolve}
										/>
									))
								})
							},
							showBarrelSave({ game, targetPlayer }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<BarrelSavesComp
											_targetPlayer={targetPlayer}
											_resolve={resolve}
										/>
									))
								})
							},
							showTargetHasSavers({ game, targetPlayer }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<TargetHasSaversComp
											_resolve={resolve}
											_targetPlayer={targetPlayer}
										/>
									))
								})
							},
							selectSaveAction({ game, cardsInHand, cardsInPlay, player }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<SelectSaveActionComp
											_cardsInHand={cardsInHand}
											_cardsInPlay={cardsInPlay}
											_player={player}
											_resolve={resolve}
										/>
									))
								})
							},
							showSaved({ game }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => <SavedComp _resolve={resolve} />)
								})
							},
							showTargetIsSaved({ game, targetPlayer }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => <>?</>)
								})
							},
							showBang({ game, message }) {
								return new Promise((resolve, reject) => {
									setRenderer(game, () => (
										<ShowBangComp _message={message} _resolve={resolve} />
									))
								})
							},
						},
					})
					if (!isAborted) {
						set$renderer({
							render: () => (
								<GameOverComp
									_outcome={outcome}
									_resolve={() => {
										history.push(makeRouteWelcome())
									}}
								/>
							),
						})
					}
				} catch (e) {
					console.error(e)
				}
			}
		})()
		return () => {
			isAborted = true
		}
	}, [setGame, $initialGame, history])
	if (game === false) {
		return <Redirect to={makeRouteWelcome()} />
	} else if (isString(game)) {
		return (
			<div className={centeredCss} style={{ color: 'red' }}>
				{game}
			</div>
		)
	} else if (game == null || isNumber(game) || $renderer == null) {
		return <div className={centeredCss}>...</div>
	} else {
		return $renderer.render()
	}
}
