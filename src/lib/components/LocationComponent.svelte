<script>
    import { onMount } from 'svelte';
    import { getWeatherInfo } from '$lib/utils/weather.js';
    import { temperatureUnit } from '$lib/stores/weather.js';

    /** @type {{ city: string, state: string, coords: { lat: number, lng: number } }} */
    export let location;
    /** @type {import('svelte').EventDispatcher<any>} */
    export let dispatch;
    /** @type {boolean} */
    export let isMyLocation = false;

    /** @type {number | null} */
    let temp = null;
    /** @type {string} */
    let description = '';

    $: unitSymbol = $temperatureUnit === 'imperial' ? 'F' : 'C';

    onMount(async () => {
        try {
            const units = $temperatureUnit === 'imperial' ? '&temperature_unit=fahrenheit' : '';
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.lat}&longitude=${location.coords.lng}&current=temperature_2m,weather_code&timezone=auto${units}`
            );
            const data = await res.json();
            temp = Math.round(data.current.temperature_2m);
            description = getWeatherInfo(data.current.weather_code, true).description;
        } catch {
            temp = null;
            description = '';
        }
    });

    function handleLocationClick() {
        window.location.href = `/weather/${location.state.trim().replaceAll(" ", "")}/${location.city.trim().replaceAll(" ", "")}?lat=${location.coords.lat}&lng=${location.coords.lng}&preview=true`;
        dispatch('close');
    }
</script>

<section class="location-section" on:click={handleLocationClick} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter') handleLocationClick(); }}>
    <div class="location-wrapper">
        <div class="location-top">
            <div>
                {#if isMyLocation}
                    <h3 class="location-title">My Location</h3>
                    <span class="location-subtitle">{location.city}</span>
                {:else}
                    <h3 class="location-title">{location.city}</h3>
                {/if}
            </div>

            <span class="location-temperature">
                {#if temp !== null}
                    {temp}&deg;{unitSymbol}
                {:else}
                    --
                {/if}
            </span>
        </div>
        <section class="location-description">
            <span>{description || 'Loading...'}</span>
        </section>
    </div>
</section>

<style>
    .location-section {
        width: 100%;
        height: 115px;
        background: var(--search-secondary-background);
        border-radius: 25px;
        padding: 1em 1.5em;
        cursor: pointer;
    }

    .location-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .location-top {
        display: flex;
        justify-content: space-between;
    }

    .location-title {
        margin-bottom: -5px;
    }

    .location-subtitle {
        font-size: 14px;
    }

    .location-subtitle, .location-description {
        font-weight: bold;
    }

    .location-temperature {
        font-size: 40px;
        margin-top: -10px;
        font-weight: lighter;
    }
</style>
