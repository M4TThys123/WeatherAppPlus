<script>
    import BannerComponent from "$lib/components/BannerComponent.svelte";
    import WeatherOverview from "$lib/components/WeatherOverview.svelte";
    import HourlyWeather from "$lib/components/HourlyWeather.svelte";
    import ForecastComponent from "$lib/components/ForecastComponent.svelte";
    import WeatherOverviewSkeleton from "$lib/components/skeletons/WeatherOverviewSkeleton.svelte";
    import HourlyWeatherSkeleton from "$lib/components/skeletons/HourlyWeatherSkeleton.svelte";
    import ForecastSkeleton from "$lib/components/skeletons/ForecastSkeleton.svelte";
    import { transformOpenMeteoData } from '$lib/utils/weather.js';
    import { temperatureUnit } from '$lib/stores/weather.js';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    /** @type {any} */
    let weatherData;
    let lat = 0;
    let lng = 0;
    let preview = false;
    /** @type {string | null} */
    let error = null;
    let loading = true;

    $: cityName = $page.params.city || '';

    async function getWeatherData(/** @type {number} */ lat, /** @type {number} */ lng) {
        try {
            error = null;
            const units = $temperatureUnit === 'imperial' ? '&temperature_unit=fahrenheit' : '';
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7${units}`
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
        const params = new URLSearchParams(window.location.search);
        lat = parseFloat(params.get('lat') || '0');
        lng = parseFloat(params.get('lng') || '0');
        preview = params.get('preview') === 'true';

        weatherData = await getWeatherData(lat, lng);
        loading = false;
    });

    temperatureUnit.subscribe(async (unit) => {
        if (!loading && lat !== 0) {
            loading = true;
            weatherData = await getWeatherData(lat, lng);
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>{cityName} | WeatherAppPlus</title>
</svelte:head>

<BannerComponent {preview}></BannerComponent>

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
    </div>
{/if}

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
</style>
