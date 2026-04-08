<script>
    import BannerComponent from "$lib/components/BannerComponent.svelte";
    import WeatherOverview from "$lib/components/WeatherOverview.svelte";
    import HourlyWeather from "$lib/components/HourlyWeather.svelte";
    import ForecastComponent from "$lib/components/ForecastComponent.svelte";
    import { transformOpenMeteoData } from '$lib/utils/weather.js';

    import { onMount } from 'svelte';

    /** @type {any} */
    let weatherData;
    let lat = 0;
    let lng = 0;
    let preview = false;

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
        const params = new URLSearchParams(window.location.search);
        lat = parseFloat(params.get('lat') || '0');
        lng = parseFloat(params.get('lng') || '0');
        preview = params.get('preview') === 'true';

        weatherData = await getWeatherData(lat, lng);
    });
</script>

<BannerComponent {preview}></BannerComponent>

<WeatherOverview {weatherData}></WeatherOverview>

<HourlyWeather {weatherData}></HourlyWeather>

<ForecastComponent {weatherData}></ForecastComponent>