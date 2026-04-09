<script>
    import { onMount } from 'svelte';
    import { getWeatherInfo } from '$lib/utils/weather.js';
    import { temperatureUnit } from '$lib/stores/weather.js';
    import AnimatedPlaceholder from './skeletons/AnimatedPlaceholder.svelte';

    /** @type {{ id: string, city: string, state: string, coords: { lat: number, lng: number } }} */
    export let city;

    /** @type {any} */
    let weather = null;
    let loading = true;

    async function fetchWeather() {
        try {
            const units = $temperatureUnit === 'imperial' ? '&temperature_unit=fahrenheit' : '';
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.coords.lat}&longitude=${city.coords.lng}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1${units}`
            );
            const data = await res.json();
            const info = getWeatherInfo(data.current.weather_code, true);
            weather = {
                temp: Math.round(data.current.temperature_2m),
                high: Math.round(data.daily.temperature_2m_max[0]),
                low: Math.round(data.daily.temperature_2m_min[0]),
                description: info.description,
                icon: info.icon
            };
        } catch {
            weather = null;
        }
        loading = false;
    }

    onMount(fetchWeather);

    $: unitSymbol = $temperatureUnit === 'imperial' ? 'F' : 'C';

    function goToCity() {
        window.location.href = `/weather/${city.state.trim().replaceAll(" ", "")}/${city.city.trim().replaceAll(" ", "")}?lat=${city.coords.lat}&lng=${city.coords.lng}`;
    }
</script>

<button class="city-card" on:click={goToCity}>
    <div class="card-left">
        <h3 class="card-city">{city.city}</h3>
        <span class="card-state">{city.state}</span>
        {#if weather}
            <span class="card-desc">{weather.description}</span>
        {/if}
    </div>

    <div class="card-right">
        {#if loading}
            <AnimatedPlaceholder class="card-skeleton-temp" />
        {:else if weather}
            <span class="card-temp">{weather.temp}&deg;{unitSymbol}</span>
            <span class="card-highlow">H: {weather.high}&deg; / L: {weather.low}&deg;</span>
        {:else}
            <span class="card-temp">--</span>
        {/if}
    </div>
</button>

<style>
    .city-card {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em 1.5em;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
    }

    .city-card:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }

    .city-card:active {
        transform: scale(0.98);
    }

    .card-left {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .card-city {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }

    .card-state {
        font-size: 13px;
        color: var(--light-grey);
    }

    .card-desc {
        font-size: 13px;
        font-weight: 500;
        margin-top: 4px;
    }

    .card-right {
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .card-temp {
        font-size: 36px;
        font-weight: 300;
        line-height: 1;
    }

    .card-highlow {
        font-size: 13px;
        color: var(--light-grey);
        margin-top: 4px;
    }

    :global(.card-skeleton-temp) {
        width: 60px;
        height: 36px;
    }
</style>
