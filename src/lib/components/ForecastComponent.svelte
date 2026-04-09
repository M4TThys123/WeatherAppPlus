<script>
    import { language, t } from '$lib/stores/i18n.js';
    import { translations } from '$lib/i18n/translations.js';
    import WeatherIcon from './WeatherIcon.svelte';
    import { getWeatherIcon } from '$lib/utils/weatherIcon.js';

    /** @type {any} */
    export let weatherData;

    /** @type {any[]} */
    let forecastData = [];

    $: if (weatherData && weatherData.daily) {
        forecastData = weatherData.daily.slice(0, 7);
    }

    /** @param {number} dt */
    function dayName(dt) {
        const dayIndex = new Date(dt * 1000).getDay();
        return translations[$language]?.days?.short?.[dayIndex] || new Date(dt * 1000).toLocaleDateString('en-us', { weekday: 'short' });
    }
</script>

<section class="forecast-section">
    <div class="section-label">
        <i class='bx bxs-calendar'></i>
        {$t('weather.forecast')}
    </div>

    {#if forecastData.length > 0}
        {#each forecastData as day (day.dt)}
            {@const iconInfo = getWeatherIcon(day.weather_code, true)}
            <div class="forecast-row">
                <div class="forecast-day">{dayName(day.dt)}</div>
                <div class="forecast-icon">
                    <WeatherIcon icon={iconInfo.id} size={32} />
                </div>
                <div class="forecast-temp">
                    {$t('weather.high')}: {Math.round(day.temp.max)}&deg; / {$t('weather.low')}: {Math.round(day.temp.min)}&deg;
                </div>
            </div>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}
</section>

<style>
    .forecast-section {
        width: 100%;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 1em 1.25em;
        margin-bottom: 1em;
    }

    .section-label {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 11px;
        letter-spacing: 0.08em;
        opacity: 0.6;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .forecast-row {
        padding: 10px 0;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .forecast-row:last-child {
        border-bottom: none;
    }

    .forecast-day {
        font-size: 16px;
        font-weight: 500;
        width: 50px;
    }

    .forecast-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forecast-temp {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.8;
        text-align: right;
        min-width: 120px;
    }
</style>
