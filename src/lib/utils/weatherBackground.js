/**
 * Returns CSS gradient and animation type based on weather code and day/night.
 * @param {number} code - WMO weather code
 * @param {boolean} isDay
 * @returns {{ gradient: string, animation: string }}
 */
export function getWeatherBackground(code, isDay) {
	if (code >= 95) {
		return {
			gradient: 'linear-gradient(to bottom, #12181f, #1a2530, #222f3d)',
			animation: 'thunderstorm'
		};
	}
	if (code >= 71 && code <= 77 || code >= 85 && code <= 86) {
		return {
			gradient: 'linear-gradient(to bottom, #3a4f65, #4d6580, #6080a0)',
			animation: 'snow'
		};
	}
	if (code >= 51 && code <= 67 || code >= 80 && code <= 82) {
		return {
			gradient: 'linear-gradient(to bottom, #1e2d3d, #2a3d52, #334d65)',
			animation: 'rain'
		};
	}
	if (code >= 45 && code <= 48) {
		return {
			gradient: 'linear-gradient(to bottom, #3d4a55, #4d5d6a, #606f80)',
			animation: 'none'
		};
	}
	if (code === 3) {
		return {
			gradient: isDay
				? 'linear-gradient(to bottom, #3a5a7a, #4a6d8f, #6a8daa)'
				: 'linear-gradient(to bottom, #151c25, #1e2835, #252f40)',
			animation: isDay ? 'clouds' : 'none'
		};
	}
	if (code === 2) {
		return {
			gradient: isDay
				? 'linear-gradient(to bottom, #3a5a7a, #4a6d8f, #6a8daa)'
				: 'linear-gradient(to bottom, #151c25, #1e2835, #252f40)',
			animation: isDay ? 'clouds' : 'none'
		};
	}
	// Clear / mainly clear (0-1)
	if (!isDay) {
		return {
			gradient: 'linear-gradient(to bottom, #0d1b2a, #1a2d45, #1e3550)',
			animation: 'stars'
		};
	}
	return {
		gradient: 'linear-gradient(to bottom, #1a6fad, #2d8fd4, #5ba8e0)',
		animation: 'sunny'
	};
}
