import { Card } from '../model/Card'

export function getCardName(c: Card) {
	/* prettier-ignore */
	switch (c) {
		case Card.BANG: return `Bang!`
		case Card.BARREL: return `Hordó`
		case Card.BEER: return `Sör`
		case Card.BIBLE: return `Biblia`
		case Card.BRAWL: return `Verekedés`
		case Card.CAN_CAN: return `Kánkán`
		case Card.CANTEEN: return `Kulacs`
		case Card.CAT_BALOU: return `Cat Balou`
		case Card.DERRINGER: return `Derringer`
		case Card.DODGE: return `Kitérés`
		case Card.DUEL: return `Párbaj`
		case Card.DYNAMITE: return `Dinamit`
		case Card.GATLING: return `Gatling`
		case Card.GENERAL_STORE: return `Szatócsbolt`
		case Card.HIDEOUT: return `Fedezék`
		case Card.INDIANS: return `Indiánok!`
		case Card.IRON_PLATE: return `Vaslemez`
		case Card.JAIL: return `Börtön`
		case Card.KNIFE: return `Kés`
		case Card.MISSED: return `Nem talált!`
		case Card.MUSTANG: return `Musztáng`
		case Card.PANIC: return `Pánik!`
		case Card.PONY_EXPRESS: return `Póni Expressz`
		case Card.PUNCH: return `Ütés`
		case Card.RAG_TIME: return `Rag Time`
		case Card.REMINGTON_3: return `Remington`
		case Card.REV_CARABINE_4: return `Rev. Carabine`
		case Card.SALOON: return `Kocsma`
		case Card.SCHOFIELD_2: return `Schofield`
		case Card.SCOPE: return `Távcső`
		case Card.SOMBRERO: return `Sombrero`
		case Card.STAGECOACH: return `Postakocsi`
		case Card.TEN_GALLON_HAT: return `Cowboykalap`
		case Card.TEQUILA: return `Tequila`
		case Card.VOLCANIC_1: return `Gyorstüzelő`
		case Card.WELLS_FARGO: return `Wells Fargo`
		case Card.WHISKY: return `Whisky`
		case Card.WINCHESTER_5: return `Winchester`
		default: return `Fekete Péter`
	}
}
