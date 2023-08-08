export function getShuffledItems(item: string[]): string[] {
	const shuffledItems = [...item];
	for (let i = shuffledItems.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
	}
	return shuffledItems;
}
