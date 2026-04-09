<script>
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import { temperatureUnit } from '$lib/stores/weather.js';
    import { language, t } from '$lib/stores/i18n.js';
    import { weatherDescriptions } from '$lib/i18n/weatherDescriptions.js';
    import WeatherIcon from './WeatherIcon.svelte';
    import { getWeatherIcon } from '$lib/utils/weatherIcon.js';

    /** @type {any} */
    export let weatherData

    /** @type {string | undefined} */
    let city;

    $: unitSymbol = $temperatureUnit === 'imperial' ? 'F' : 'C';
    $: description = weatherData
        ? (weatherDescriptions[$language]?.[weatherData.current.weather_code] || weatherData.current.weather[0].description)
        : '';
    $: iconInfo = weatherData ? getWeatherIcon(weatherData.current.weather_code, weatherData.current.is_day === 1) : null;

    onMount(() => {
        const parts = $page.url.pathname.split('/');
        city = decodeURIComponent(parts[parts.length - 1]);
    });
</script>

{#if weatherData}
    <section class="hero-section">
        <div class="hero-wrapper">
            {#if $page.url.pathname === '/'}
                <h2 class="hero-title">{$t('locations.myLocation')}</h2>
                <p class="hero-subtitle">Obdam</p>
            {:else}
                <h2 class="hero-title">{city}</h2>
                <p class="hero-subtitle">
                    {new Date(weatherData.currentTime).toLocaleDateString(
                        $language === 'nl' ? 'nl-NL' : 'en-US',
                        { weekday: "short", day: "2-digit", month: "short" }
                    )}
                    {new Date(weatherData.currentTime).toLocaleTimeString(
                        $language === 'nl' ? 'nl-NL' : 'en-US',
                        { timeStyle: "short" }
                    )}
                </p>
            {/if}

            <p class="hero-temperature">
                {Math.round(weatherData.current.temp)}&deg;{unitSymbol}
            </p>

            <section class="hero-description">
                <p class="hero-feeltemp">
                    {$t('weather.feelsLike')} {Math.round(weatherData.current.feels_like)}&deg;{unitSymbol}
                </p>
                {description}
            </section>

            {#if iconInfo}
                <div class="hero-icon__container">
                    <WeatherIcon icon={iconInfo.id} size={120} />
                </div>
            {/if}
        </div>
    </section>
{/if}

<style>
    .hero-section {
        width: 100%;
    }

    .hero-wrapper {
        padding: 2em 0;
        text-align: center;
    }

    .hero-title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 2px;
    }

    .hero-subtitle {
        font-size: 13px;
        text-transform: uppercase;
        font-weight: 500;
        opacity: 0.7;
    }

    .hero-temperature {
        font-size: 86px;
        font-weight: 200;
        letter-spacing: -2px;
        line-height: 1;
        margin: 4px 0;
    }

    .hero-description {
        font-size: 18px;
        font-weight: 500;
        opacity: 0.9;
    }

    .hero-feeltemp {
        margin-bottom: 4px;
        font-weight: 400;
    }

    .hero-icon__container {
        display: flex;
        justify-content: center;
        margin-top: 4px;
    }

    @media (min-width: 768px) {
        .hero-title { font-size: 34px; }
        .hero-temperature { font-size: 96px; }
    }
</style>
