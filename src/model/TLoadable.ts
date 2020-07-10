export type TLoadable<T extends object | boolean> =
	| undefined
	| null
	| number
	| string
	| T
