<script>
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import { temperatureUnit } from '$lib/stores/weather.js';

    /** @type {any} */
    export let weatherData

    /** @type {string | undefined} */
    let city;

    $: unitSymbol = $temperatureUnit === 'imperial' ? 'F' : 'C';

    onMount(() => {
        const parts = $page.url.pathname.split('/');
        city = decodeURIComponent(parts[parts.length - 1]);
    });
</script>

{#if weatherData}
    <section class="hero-section">
        <div class="hero-wrapper">
            {#if $page.url.pathname === '/'}
                <h2 class="hero-title">My Location</h2>
                <p class="hero-subtitle">Obdam</p>
            {:else}
                <h2 class="hero-title">{city}</h2>
                <p class="hero-subtitle">
                    {
                        new Date(weatherData.currentTime).toLocaleDateString(
                            "en-us",
                            { weekday: "short", day: "2-digit", month: "short" }
                        )
                    }
                    {
                        new Date(weatherData.currentTime).toLocaleTimeString(
                            "en-us",
                            { timeStyle: "short" }
                        )
                    }
                </p>
            {/if}

            <p class="hero-temperature">
                {Math.round(weatherData.current.temp)}&deg;{unitSymbol}
            </p>

            <section class="hero-description">
                <p class="hero-feeltemp">
                    Feels like {Math.round(weatherData.current.feels_like)}&deg;{unitSymbol}
                </p>
                {weatherData.current.weather[0].description}
            </section>

            <div class="hero-icon__container">
                <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                     alt="Current weather icon"
                     class="hero-icon__image">
            </div>
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
        margin-top: -10px;
    }

    .hero-icon__image {
        width: 120px;
        height: 120px;
    }

    @media (min-width: 768px) {
        .hero-title {
            font-size: 34px;
        }

        .hero-temperature {
            font-size: 96px;
        }
    }
</style>
