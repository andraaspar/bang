export function joinList(
	list: string[],
	{
		itemJoiner = ', ',
		lastJoiner = ' és ',
	}: {
		itemJoiner?: string
		lastJoiner?: string
	} = {},
): string {
	const last = list[list.length - 1]
	const rest = list.slice(0, -1)
	return rest.length ? rest.join(itemJoiner) + lastJoiner + last : last
}
