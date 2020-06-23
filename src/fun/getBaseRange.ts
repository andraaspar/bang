import { Card } from '../model/Card'

export function getRange(cards: Card[]): number {
	let range = 1
	for (const card of cards) {
		switch (card) {
			case Card.SCOPE:
			case Card.SCHOFIELD_2:
				range += 1
				break
			case Card.REMINGTON_3:
				range += 2
				break
			case Card.REV_CARABINE_4:
				range += 3
				break
			case Card.WINCHESTER_5:
				range += 4
				break
		}
	}
	return range
}
