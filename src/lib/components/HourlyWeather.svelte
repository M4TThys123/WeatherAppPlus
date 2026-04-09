<script>
    import { t } from '$lib/stores/i18n.js';
    import WeatherIcon from './WeatherIcon.svelte';
    import { getWeatherIcon } from '$lib/utils/weatherIcon.js';

    /** @type {any} */
    export let weatherData
</script>

<section class="hourly-section">
    {#if weatherData}
        <h2 class="section-label">{$t('weather.hourly')}</h2>

        <div class="hourly-scroll">
            {#each weatherData.hourly as hourData (hourData.dt)}
                {@const iconInfo = getWeatherIcon(hourData.weather_code, hourData.is_day === 1)}
                <div class="hour-item">
                    <p class="hour-time">
                        {new Date(hourData.currentTime).toLocaleTimeString("en-us", {hour: "numeric"})}
                    </p>
                    <WeatherIcon icon={iconInfo.id} size={36} />
                    <p class="hour-temp">
                        {Math.round(hourData.temp)}&deg;
                    </p>
                </div>
            {/each}
        </div>
    {/if}
</section>

<style>
    .hourly-section {
        width: 100%;
        padding: 1.5em 0;
    }

    .section-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 500;
        opacity: 0.6;
        margin-bottom: 0.75em;
    }

    .hourly-scroll {
        display: flex;
        gap: 1em;
        overflow-x: auto;
        padding-bottom: 8px;
        -webkit-overflow-scrolling: touch;
    }

    .hourly-scroll::-webkit-scrollbar {
        height: 0;
        display: none;
    }

    .hour-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        flex-shrink: 0;
        min-width: 60px;
    }

    .hour-time {
        white-space: nowrap;
        font-size: 14px;
        font-weight: 500;
    }

    .hour-temp {
        font-size: 18px;
        font-weight: 500;
    }
</style>
