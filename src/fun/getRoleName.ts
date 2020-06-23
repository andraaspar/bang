import { Role } from '../model/Role'

export function getRoleName(r: Role) {
	/* prettier-ignore */
	switch (r) {
		case Role.SHERIFF: return `Sheriff`
		case Role.RENEGADE: return `Renegát`
		case Role.OUTLAW: return `Bandita`
		case Role.DEPUTY: return `Sheriff helyettes`
		default: return `Széltoló`
	}
}
