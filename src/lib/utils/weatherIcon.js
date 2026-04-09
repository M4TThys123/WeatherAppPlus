/**
 * Maps WMO weather code + is_day to an icon identifier and OpenWeatherMap icon code.
 * @param {number} code
 * @param {boolean} isDay
 * @returns {{ id: string, owm: string }}
 */
export function getWeatherIcon(code, isDay = true) {
	const d = isDay ? 'd' : 'n';

	if (code === 0 || code === 1) return { id: isDay ? 'clear-day' : 'clear-night', owm: `01${d}` };
	if (code === 2) return { id: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night', owm: `02${d}` };
	if (code === 3) return { id: 'overcast', owm: `04${d}` };
	if (code >= 45 && code <= 48) return { id: 'fog', owm: `50${d}` };
	if (code >= 51 && code <= 57) return { id: 'drizzle', owm: `09${d}` };
	if (code >= 61 && code <= 67) return { id: 'rain', owm: `10${d}` };
	if (code >= 71 && code <= 77) return { id: 'snow', owm: `13${d}` };
	if (code >= 80 && code <= 82) return { id: 'rain-showers', owm: `09${d}` };
	if (code >= 85 && code <= 86) return { id: 'snow', owm: `13${d}` };
	if (code >= 95) return { id: 'thunderstorm', owm: `11${d}` };

	return { id: isDay ? 'clear-day' : 'clear-night', owm: `01${d}` };
}
