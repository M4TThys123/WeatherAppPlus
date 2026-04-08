/**
 * Maps WMO weather codes to descriptions and OpenWeatherMap icon codes.
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - whether it's daytime
 * @returns {{ description: string, icon: string }}
 */
export function getWeatherInfo(code, isDay = true) {
	const dayNight = isDay ? 'd' : 'n';

	/** @type {Record<number, { description: string, icon: string }>} */
	const map = {
		0: { description: 'Clear sky', icon: `01${dayNight}` },
		1: { description: 'Mainly clear', icon: `01${dayNight}` },
		2: { description: 'Partly cloudy', icon: `02${dayNight}` },
		3: { description: 'Overcast', icon: `04${dayNight}` },
		45: { description: 'Fog', icon: `50${dayNight}` },
		48: { description: 'Depositing rime fog', icon: `50${dayNight}` },
		51: { description: 'Light drizzle', icon: `09${dayNight}` },
		53: { description: 'Moderate drizzle', icon: `09${dayNight}` },
		55: { description: 'Dense drizzle', icon: `09${dayNight}` },
		61: { description: 'Slight rain', icon: `10${dayNight}` },
		63: { description: 'Moderate rain', icon: `10${dayNight}` },
		65: { description: 'Heavy rain', icon: `10${dayNight}` },
		66: { description: 'Light freezing rain', icon: `13${dayNight}` },
		67: { description: 'Heavy freezing rain', icon: `13${dayNight}` },
		71: { description: 'Slight snow', icon: `13${dayNight}` },
		73: { description: 'Moderate snow', icon: `13${dayNight}` },
		75: { description: 'Heavy snow', icon: `13${dayNight}` },
		77: { description: 'Snow grains', icon: `13${dayNight}` },
		80: { description: 'Slight rain showers', icon: `09${dayNight}` },
		81: { description: 'Moderate rain showers', icon: `09${dayNight}` },
		82: { description: 'Violent rain showers', icon: `09${dayNight}` },
		85: { description: 'Slight snow showers', icon: `13${dayNight}` },
		86: { description: 'Heavy snow showers', icon: `13${dayNight}` },
		95: { description: 'Thunderstorm', icon: `11${dayNight}` },
		96: { description: 'Thunderstorm with slight hail', icon: `11${dayNight}` },
		99: { description: 'Thunderstorm with heavy hail', icon: `11${dayNight}` },
	};

	return map[code] || { description: 'Unknown', icon: `01${dayNight}` };
}

/**
 * Transforms Open-Meteo API response to the format the components expect.
 * @param {any} data - Open-Meteo API response
 * @returns {any} - Transformed weather data matching the old OpenWeatherMap structure
 */
export function transformOpenMeteoData(data) {
	const now = new Date();
	const currentHour = now.getHours();
	const isDay = currentHour >= 6 && currentHour < 21;
	const currentInfo = getWeatherInfo(data.current.weather_code, isDay);

	const hourly = data.hourly.time.map((/** @type {string} */ time, /** @type {number} */ i) => {
		const date = new Date(time);
		const hourIsDay = date.getHours() >= 6 && date.getHours() < 21;
		const info = getWeatherInfo(data.hourly.weather_code[i], hourIsDay);

		return {
			dt: Math.floor(date.getTime() / 1000),
			temp: data.hourly.temperature_2m[i],
			currentTime: date.getTime(),
			weather: [{ description: info.description, icon: info.icon }]
		};
	});

	const daily = data.daily.time.map((/** @type {string} */ time, /** @type {number} */ i) => {
		const date = new Date(time);
		const info = getWeatherInfo(data.daily.weather_code[i], true);

		return {
			dt: Math.floor(date.getTime() / 1000),
			temp: {
				max: data.daily.temperature_2m_max[i],
				min: data.daily.temperature_2m_min[i]
			},
			weather: [{ description: info.description, icon: info.icon }]
		};
	});

	return {
		current: {
			dt: Math.floor(new Date(data.current.time).getTime() / 1000),
			temp: data.current.temperature_2m,
			feels_like: data.current.apparent_temperature,
			weather: [{ description: currentInfo.description, icon: currentInfo.icon }],
			weather_code: data.current.weather_code,
			is_day: data.current.is_day ?? (isDay ? 1 : 0),
			humidity: data.current.relative_humidity_2m,
			wind_speed: data.current.wind_speed_10m,
			wind_direction: data.current.wind_direction_10m,
			uv_index: data.current.uv_index,
			visibility: data.current.visibility
		},
		timezone_offset: data.utc_offset_seconds,
		currentTime: Date.now(),
		hourly,
		daily
	};
}
