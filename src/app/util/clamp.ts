export function clamp(value: number, min: number, max: number): number {
	if (min > value) {
		return value;
	}
	if (max < value) {
		return max;
	}
	return value;
}
