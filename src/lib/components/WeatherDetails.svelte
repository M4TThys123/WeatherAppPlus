<script>
    import { temperatureUnit } from '$lib/stores/weather.js';
    import { t } from '$lib/stores/i18n.js';

    /** @type {any} */
    export let weatherData;

    $: unitSymbol = $temperatureUnit === 'imperial' ? 'F' : 'C';

    /** @param {number} deg */
    function windDirection(deg) {
        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return dirs[Math.round(deg / 45) % 8];
    }

    /** @param {number} uv */
    function uvLevel(uv) {
        if (uv <= 2) return 'Low';
        if (uv <= 5) return 'Moderate';
        if (uv <= 7) return 'High';
        if (uv <= 10) return 'Very High';
        return 'Extreme';
    }

    /** @param {number} uv */
    function uvColor(uv) {
        if (uv <= 2) return '#4ade80';
        if (uv <= 5) return '#facc15';
        if (uv <= 7) return '#fb923c';
        if (uv <= 10) return '#ef4444';
        return '#a855f7';
    }
</script>

{#if weatherData}
    <section class="details-section">
        <div class="details-grid">
            <div class="detail-tile">
                <span class="detail-label">{$t('weather.feelsLike')}</span>
                <span class="detail-value">{Math.round(weatherData.current.feels_like)}&deg;{unitSymbol}</span>
            </div>

            <div class="detail-tile">
                <span class="detail-label">{$t('weather.humidity')}</span>
                <span class="detail-value">{weatherData.current.humidity ?? '--'}%</span>
            </div>

            <div class="detail-tile">
                <span class="detail-label">{$t('weather.wind')}</span>
                <span class="detail-value">
                    {Math.round(weatherData.current.wind_speed ?? 0)} km/h
                </span>
                <span class="detail-sub">{windDirection(weatherData.current.wind_direction ?? 0)}</span>
            </div>

            <div class="detail-tile">
                <span class="detail-label">{$t('weather.uvIndex')}</span>
                <span class="detail-value" style="color: {uvColor(weatherData.current.uv_index ?? 0)}">
                    {Math.round(weatherData.current.uv_index ?? 0)}
                </span>
                <span class="detail-sub">{uvLevel(weatherData.current.uv_index ?? 0)}</span>
            </div>

            <div class="detail-tile">
                <span class="detail-label">{$t('weather.visibility')}</span>
                <span class="detail-value">
                    {weatherData.current.visibility != null ? Math.round(weatherData.current.visibility / 1000) : '--'} km
                </span>
            </div>

            <div class="detail-tile">
                <span class="detail-label">{$t('weather.pressure')}</span>
                <span class="detail-value">--</span>
                <span class="detail-sub">hPa</span>
            </div>
        </div>
    </section>
{/if}

<style>
    .details-section {
        width: 100%;
        padding: 1em 0 2em;
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75em;
    }

    @media (min-width: 768px) {
        .details-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .detail-tile {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 1em;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .detail-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 500;
        opacity: 0.6;
    }

    .detail-value {
        font-size: 28px;
        font-weight: 300;
    }

    .detail-sub {
        font-size: 13px;
        opacity: 0.7;
    }
</style>
