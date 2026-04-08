<script>
import WeatherOverview from "$lib/components/WeatherOverview.svelte";
import ForecastComponent from "$lib/components/ForecastComponent.svelte";
import HourlyWeather from "$lib/components/HourlyWeather.svelte";
import BannerComponent from "$lib/components/BannerComponent.svelte";
import { transformOpenMeteoData } from '$lib/utils/weather.js';

import { onMount } from 'svelte';

/** @type {any} */
let weatherData;
let lat = 52.676145;
let lng = 4.90843;

async function getWeatherData(/** @type {number} */ lat, /** @type {number} */ lng) {
	try {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`
		);
		const data = await response.json();
		return transformOpenMeteoData(data);
	} catch (err) {
		console.log(err);
	}
}

onMount(async () => {
	weatherData = await getWeatherData(lat, lng);
});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<BannerComponent preview={false}></BannerComponent>

<WeatherOverview {weatherData}></WeatherOverview>

<HourlyWeather {weatherData}></HourlyWeather>

<ForecastComponent {weatherData}></ForecastComponent>


<style>

</style>



