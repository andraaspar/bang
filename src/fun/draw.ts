export function draw<T>(arr: T[]): T {
	const index = Math.floor(Math.random() * arr.length)
	return arr.splice(index, 1)[0]
}
