import { Role } from '../model/Role'

export function getRoleName(r: Role) {
	/* prettier-ignore */
	switch (r) {
		case Role.SHERIFF: return `sheriff`
		case Role.RENEGADE: return `renegát`
		case Role.OUTLAW: return `bandita`
		case Role.DEPUTY: return `sheriff helyettes`
		default: return `széltoló`
	}
}
