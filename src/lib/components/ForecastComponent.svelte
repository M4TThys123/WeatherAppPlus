<script>
    export let weatherData;

    let forecastData = [];

    // Extract the next 7 days of weather data from the weatherData prop
    if (weatherData && weatherData.daily) {
        forecastData = weatherData.daily.slice(0, 7);
    }
</script>

<section class="forecast-section mb-5">
    <div class="forecast-wrapper">
        <div class="forecast-heading">
            <i class='bx bxs-calendar forecast-icon'></i>
            7-Day Forecast
        </div>

        {#if true}
            {#each forecastData as day (day.dt)}
                <div class="forecast-row">
                    <div class="forecast-day">{new Date(day.dt * 1000).toLocaleDateString("en-us", { weekday: "short" })}</div>
                    <div class="forecast-icon__wrapper">
                        <img class="hourly-weather-image" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="" />
                    </div>
                    <div class="forecast-temp">H: {Math.round(day.temp.max)}&deg; / L: {Math.round(day.temp.min)}&deg;</div>
                </div>
            {/each}
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</section>

<style>
    .forecast-wrapper {
        width: 100%;
    }

    .forecast-section {
        width: 100%;
        background: var(--dark-blue);
        border-radius: 25px;
        padding: 1em 1.5em;
    }

    .forecast-heading {
        position: relative;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 16px;
        color: var(--light-grey);
        margin-bottom: 6px;
    }

    .forecast-icon {
        color: var(--light-grey) !important;
    }

    .forecast-row {
        margin-top: 20px;
        font-size: 16px;
        font-weight: bold;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .forecast-day{
        font-size: 24px;
    }

    .forecast-icon__wrapper {
        width: 50px;
        height: 50px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forecast-temp {
        font-weight: normal;
    }

    /* Media Queries */
    @media (min-width: 768px) {
        .forecast-section {
            max-width: 350px;
            width: 50% !important;
        }
    }

    @media (min-width: 992px) {
        .forecast-section {
            /* Add your styles for medium-sized screens here */
        }
    }
</style>
