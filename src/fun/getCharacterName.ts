import { Character } from '../model/Character'

export function getCharacterName(c: Character) {
	/* prettier-ignore */
	switch (c) {
		case Character.BART_CASSIDY: return `Bart Cassidy`
		case Character.BLACK_JACK: return `Black Jack`
		case Character.CALAMITY_JANET: return `Calamity Janet`
		case Character.EL_GRINGO: return `El Gringo`
		case Character.JESSE_JONES: return `Jesse Jones`
		case Character.JOURDONNAIS: return `Jourdonnais`
		case Character.KIT_CARLSON: return `Kit Carlson`
		case Character.LUCKY_DUKE: return `Lucky Duke`
		case Character.PAUL_REGRET: return `Paul Regret`
		case Character.PEDRO_RAMIREZ: return `Pedro Ramirez`
		case Character.ROSE_DOOLAN: return `Rose Doolan`
		case Character.SID_KETCHUM: return `Sid Ketchum`
		case Character.SLAB_THE_KILLER: return `Slab the Killer`
		case Character.SUZY_LAFAYETTE: return `Suzy Lafayette`
		case Character.VULTURE_SAM: return `Vulture Sam`
		case Character.WILLY_THE_KID: return `Willy the Kid`
		case Character.APACHE_KID: return `Apache Kid`
		case Character.BELLE_STAR: return `Belle Star`
		case Character.BILL_NOFACE: return `Bill Noface`
		case Character.CHUCK_WENGAM: return `Chuck Wengam`
		case Character.DOC_HOLYDAY: return `Doc Holyday`
		case Character.ELENA_FUENTE: return `Elena Fuente`
		case Character.GREG_DIGGER: return `Greg Digger`
		case Character.HERB_HUNTER: return `Herb Hunter`
		case Character.JOSE_DELGADO: return `José Delgado`
		case Character.MOLLY_STARK: return `Molly Stark`
		case Character.PAT_BRENNAN: return `Pat Brennan`
		case Character.PIXIE_PETE: return `Pixie Pete`
		case Character.SEAN_MALLORY: return `Sean Mallory`
		case Character.TEQUILA_JOE: return `Tequila Joe`
		case Character.VERA_CUSTER: return `Vera Custer`
		default: return `Titokzatos Idegen`
	}
}
