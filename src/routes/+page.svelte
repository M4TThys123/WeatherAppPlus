<script>
import WeatherOverview from "$lib/components/WeatherOverview.svelte";
import ForecastComponent from "$lib/components/ForecastComponent.svelte";
import HourlyWeather from "$lib/components/HourlyWeather.svelte";
import BannerComponent from "$lib/components/BannerComponent.svelte";
import CityCard from "$lib/components/CityCard.svelte";
import WeatherOverviewSkeleton from "$lib/components/skeletons/WeatherOverviewSkeleton.svelte";
import HourlyWeatherSkeleton from "$lib/components/skeletons/HourlyWeatherSkeleton.svelte";
import ForecastSkeleton from "$lib/components/skeletons/ForecastSkeleton.svelte";
import WeatherDetails from "$lib/components/WeatherDetails.svelte";
import { transformOpenMeteoData } from '$lib/utils/weather.js';
import { getWeatherBackground } from '$lib/utils/weatherBackground.js';
import { temperatureUnit } from '$lib/stores/weather.js';
import { weatherBg } from '$lib/stores/background.js';
import { savedCities } from '$lib/stores/cities.js';
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';

/** @type {any} */
let weatherData;
let lat = 52.676145;
let lng = 4.90843;
/** @type {string | null} */
let error = null;
let loading = true;

async function getWeatherData(/** @type {number} */ lat, /** @type {number} */ lng) {
	try {
		error = null;
		const units = $temperatureUnit === 'imperial' ? '&temperature_unit=fahrenheit' : '';
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code,is_day,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,visibility&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7${units}`
		);
		if (!response.ok) throw new Error('Weerdata kon niet worden opgehaald');
		const data = await response.json();
		return transformOpenMeteoData(data);
	} catch (err) {
		error = err instanceof Error ? err.message : 'Er ging iets mis';
		return null;
	}
}

onMount(async () => {
	weatherData = await getWeatherData(lat, lng);
	if (weatherData) {
		weatherBg.set(getWeatherBackground(weatherData.current.weather_code, weatherData.current.is_day === 1));
	}
	loading = false;
});

temperatureUnit.subscribe(async (unit) => {
	if (!loading) {
		loading = true;
		weatherData = await getWeatherData(lat, lng);
		loading = false;
	}
});
</script>

<svelte:head>
	<title>Home | WeatherAppPlus</title>
</svelte:head>

<BannerComponent preview={false}></BannerComponent>

{#if error}
	<div class="error-message" transition:fade>
		<i class='bx bx-error-circle'></i>
		<p>{error}</p>
		<button on:click={async () => { loading = true; weatherData = await getWeatherData(lat, lng); loading = false; }}>
			Opnieuw proberen
		</button>
	</div>
{:else if loading}
	<div transition:fade={{ duration: 200 }}>
		<WeatherOverviewSkeleton />
		<HourlyWeatherSkeleton />
		<ForecastSkeleton />
	</div>
{:else}
	<div transition:fade={{ duration: 300 }}>
		<WeatherOverview {weatherData}></WeatherOverview>
		<HourlyWeather {weatherData}></HourlyWeather>
		<ForecastComponent {weatherData}></ForecastComponent>
		<WeatherDetails {weatherData} />
	</div>
{/if}

<section class="saved-cities">
	<h2 class="saved-title">Saved Locations</h2>
	{#if $savedCities.length > 0}
		<div class="saved-list">
			{#each $savedCities as city (city.id)}
				<CityCard {city} />
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<i class='bx bx-map-pin'></i>
			<p>No saved cities yet</p>
			<p class="empty-hint">Search for a city and tap + to save it here.</p>
		</div>
	{/if}
</section>

<style>
	.error-message {
		text-align: center;
		padding: 3em 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
	}

	.error-message i {
		font-size: 48px;
	}

	.error-message button {
		margin-top: 1em;
		padding: 0.5em 1.5em;
		background: var(--dark-blue);
		color: var(--light);
		border-radius: 12px;
		font-size: 14px;
	}

	.error-message button:hover {
		opacity: 0.8;
	}

	.saved-cities {
		width: 100%;
		padding: 1em 0 3em;
	}

	.saved-title {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 1em;
		color: var(--light);
	}

	.saved-list {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.empty-state {
		text-align: center;
		padding: 2em 1em;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25em;
	}

	.empty-state i {
		font-size: 32px;
		margin-bottom: 0.25em;
	}

	.empty-state p {
		font-size: 15px;
		font-weight: 500;
	}

	.empty-hint {
		font-size: 13px !important;
		font-weight: 400 !important;
		color: var(--light-grey);
	}
</style>
