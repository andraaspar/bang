export function repeat<T>(v: T, count: number): T[] {
	const result: T[] = []
	for (let i = 0; i < count; i++) {
		result.push(v)
	}
	return result
}
