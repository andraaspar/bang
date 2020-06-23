import { JustifyContentProperty } from 'csstype'
import { css, cx } from 'emotion/macro'
import React, { PropsWithChildren } from 'react'

export interface RowCompProps {
	_isVertical?: boolean
	_gap?: number
	_gapX?: number
	_gapY?: number
	_padding?: number
	_paddingX?: number
	_paddingY?: number
	_paddingTop?: number
	_paddingBottom?: number
	_paddingLeft?: number
	_paddingRight?: number
	_fill?: boolean
	_wrap?: boolean
	_justify?: JustifyContentProperty
}

export function RowComp(p: PropsWithChildren<RowCompProps>) {
	const paddingLeft = p._paddingLeft ?? p._paddingX ?? p._padding ?? 0
	const paddingRight = p._paddingRight ?? p._paddingX ?? p._padding ?? 0
	const paddingTop = p._paddingTop ?? p._paddingY ?? p._padding ?? 0
	const paddingBottom = p._paddingBottom ?? p._paddingY ?? p._padding ?? 0
	const gapX = p._gapX ?? p._gap ?? 0
	const gapY = p._gapY ?? p._gap ?? 0
	return (
		<div
			className={cx(
				css({
					display: 'flex',
					flexDirection: p._isVertical ? 'column' : 'row',
					flex: '0 0 auto', // Fix iOS height 0 bug
					padding: `${paddingTop}px ${paddingRight}px ${
						p._isVertical ? 0 : paddingBottom
					}px ${paddingLeft}px`,

					'&::after': p._isVertical
						? {
								content: "''",
								flex: `0 0 ${paddingBottom}px`,
						  }
						: undefined,
				}),
				p._fill && wrapperFillCss,
			)}
		>
			<div
				className={cx(
					p._isVertical ? columnCss : rowCss,
					p._fill && fillCss,
					p._wrap && wrapCss,
					css({
						margin: `${-gapY}px 0px 0px ${-gapX}px`,
						flexBasis: p._fill
							? `calc(100% + ${p._isVertical ? gapY : gapX}px)`
							: `auto`,
						justifyContent: p._justify,

						'& > :not(#__NEVER__)': {
							margin: `${gapY}px 0px 0px ${gapX}px`,
						},
					}),
				)}
			>
				{p.children}
			</div>
		</div>
	)
}

const wrapperFillCss = css({
	flexBasis: '100%',
})

const columnCss = css({
	display: 'flex',
	flexDirection: 'column',
})

const rowCss = css({
	display: 'flex',
})

const fillCss = css({
	flexBasis: '100%',
})

const wrapCss = css({
	flexWrap: 'wrap',
})
