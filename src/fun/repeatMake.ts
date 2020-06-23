export function repeatMake<T>(fn: (i: number) => T, count: number): T[] {
	const result: T[] = []
	for (let i = 0; i < count; i++) {
		result.push(fn(i))
	}
	return result
}
