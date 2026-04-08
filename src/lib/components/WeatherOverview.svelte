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
        city = parts[parts.length - 1];
    });
</script>

{#if weatherData}
    <section class="hero-section w-full md:w-1/2">
        <div class="hero-wrapper">
            {#if $page.url.pathname === '/'}
                <h2 class="hero-title">Matthijs' location</h2>
                <p class="hero-subtitle">Obdam</p>
            {:else}
                <h2 class="hero-title">{city}</h2>
                <p class="hero-subtitle">
                    {
                        new Date(weatherData.currentTime).toLocaleDateString(
                            "en-us",
                            {
                                weekday: "short",
                                day: "2-digit",
                                month: "short"
                            }
                        )
                    }
                    {
                        new Date(weatherData.currentTime).toLocaleTimeString(
                            "en-us",
                            {
                                timeStyle: "short"
                            }
                        )
                    }
                </p>
            {/if}

            <!--            <p class="hero-temperature">8&deg;C</p>-->
            <p class="hero-temperature">
                { Math.round(weatherData.current.temp)}&deg;{unitSymbol}
            </p>

            <section class="hero-description">
                <p class="hero-feeltemp">
                    Feels like { Math.round(weatherData.current.feels_like)}&deg;{unitSymbol}
                </p>
                <!--                <p>Few Clouds</p>-->
                { weatherData.current.weather[0].description}
            </section>
            <div class="hero-icon__container">
                <div class="hero-icon__wrapper">
                    <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                         alt="Current weather icon"
                         class="hero-icon__image">
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
    .hero-section {
        display: flex;
        justify-content: center;
    }

    .hero-wrapper {
        padding: 3em 0;
        text-align: center;
    }

    .hero-title {
        font-size: 32px;
        margin-bottom: 2px;
    }

    .hero-subtitle {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: bold;

    }

    .hero-temperature {
        margin-top: -2px;
        font-size: 100px;
        font-weight: lighter;
        margin-bottom: 2px;
    }

    .hero-description {
        font-size: 20px;
        font-weight: bold;
    }

    .hero-feeltemp {
        margin-bottom: 4px;
    }

    .hero-icon__container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .hero-icon__wrapper {
        margin-top: -15px;
        width: 150px;
        height: 150px;
    }

    .hero-icon__image {
        width: 100%;
        height: auto;
    }

</style>