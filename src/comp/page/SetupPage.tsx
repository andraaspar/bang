import produce from 'immer'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IGame, makeGame } from '../../model/IGame'
import { makePlayer } from '../../model/IPlayer'
import { IPlayerError } from '../../model/IPlayerError'
import { makeRouteGame } from '../../model/routing'
import { RED_5 } from '../../style/styleConstants'
import { GameContext } from '../context/GameContext'
import { RowComp } from '../RowComp'

export interface SetupPageProps {}

export function SetupPage(props: SetupPageProps) {
	const { setGame } = useContext(GameContext)
	const [$game, set$game] = useState<IGame>(makeGame)
	const history = useHistory()
	const playerErrors = $game.players.map(
		(player): IPlayerError => {
			const missingName = !player.name.trim()
			return {
				hasError: missingName,
				missingName,
			}
		},
	)
	return (
		<RowComp _isVertical _padding={20} _gap={20}>
			<RowComp _isVertical _gap={10}>
				<h3>Játékosok</h3>
				{$game.players.map((player, playerIndex) => (
					<div key={playerIndex}>
						<RowComp _isVertical>
							<input
								value={player.name}
								onChange={(e) => {
									set$game(
										produce($game, (game) => {
											game.players[playerIndex].name = e.currentTarget.value
										}),
									)
								}}
							/>
							<RowComp _gapX={20}>
								<label>
									<input
										type='checkbox'
										checked={player.ai}
										onChange={(e) => {
											set$game(
												produce($game, (game) => {
													game.players[playerIndex].ai = e.currentTarget.checked
												}),
											)
										}}
									/>{' '}
									Mesterséges Unintelligencia
								</label>
								<button
									onClick={(e) => {
										set$game(
											produce($game, (game) => {
												game.players.splice(playerIndex, 1)
											}),
										)
									}}
								>
									Töröld
								</button>
							</RowComp>
							{playerErrors[playerIndex].hasError && (
								<div style={{ color: RED_5, whiteSpace: 'pre-wrap' }}>
									{[playerErrors[playerIndex].missingName && `Add meg a neved!`]
										.filter(Boolean)
										.join('\n')}
								</div>
							)}
						</RowComp>
					</div>
				))}
				<div>
					<button
						onClick={(e) => {
							set$game(
								produce($game, (game) => {
									game.players.push(
										makePlayer({
											name: `${game.players.length + 1}. játékos`,
											ai: game.players.length > 0,
										}),
									)
								}),
							)
						}}
					>
						Kérek még egyet
					</button>
				</div>
			</RowComp>
			<div style={{ textAlign: 'center' }}>
				<button
					type='button'
					disabled={
						$game.players.length >= 4 &&
						$game.players.length <= 7 &&
						playerErrors.find((pe) => pe.hasError) != null
					}
					onClick={(e) => {
						setGame($game)
						history.push(makeRouteGame())
					}}
				>
					Rajta
				</button>
			</div>
		</RowComp>
	)
}
