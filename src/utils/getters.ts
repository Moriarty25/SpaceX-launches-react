export function getRandomImage(min: number = 0, max: number) {
	const rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}
