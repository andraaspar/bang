import { Character } from '../model/Character'

export function getCharacterHealth(c: Character) {
	/* prettier-ignore */
	switch (c) {
		case Character.EL_GRINGO: return 3
		case Character.PAUL_REGRET: return 3

		case Character.APACHE_KID: return 3
		case Character.ELENA_FUENTE: return 3
		case Character.PIXIE_PETE: return 3
		case Character.SEAN_MALLORY: return 3
		case Character.VERA_CUSTER: return 3
		
		default: return 4
	}
}
