<script>
    /** @type {any} */
    export let weatherData;

    /** @type {any[]} */
    let forecastData = [];

    $: if (weatherData && weatherData.daily) {
        forecastData = weatherData.daily.slice(0, 7);
    }
</script>

<section class="forecast-section">
    <div class="section-label">
        <i class='bx bxs-calendar'></i>
        7-Day Forecast
    </div>

    {#if forecastData.length > 0}
        {#each forecastData as day (day.dt)}
            <div class="forecast-row">
                <div class="forecast-day">
                    {new Date(day.dt * 1000).toLocaleDateString("en-us", { weekday: "short" })}
                </div>
                <div class="forecast-icon">
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="" />
                </div>
                <div class="forecast-temp">
                    H: {Math.round(day.temp.max)}&deg; / L: {Math.round(day.temp.min)}&deg;
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
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forecast-icon img {
        width: 40px;
        height: 40px;
    }

    .forecast-temp {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.8;
        text-align: right;
        min-width: 120px;
    }
</style>
