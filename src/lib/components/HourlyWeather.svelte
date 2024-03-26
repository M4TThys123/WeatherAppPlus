<script>
    export let weatherData
    console.log(weatherData)
</script>

<section class="hourly-weather-section">
    {#if weatherData}
        <h2 class="hourly-weather-title">Hourly Weather</h2>

        <div class="hourly-weather-wrapper">
            <div class="hourly-weather-items">
                {#each weatherData.hourly as hourData (hourData.dt)}
                    <div class="hourly-weather-item" style="flex-basis: 0; flex-grow: 1; flex-shrink: 0;">
                        <p class="hourly-weather-time">
                            {new Date(hourData.currentTime).toLocaleTimeString("en-us", {hour: "numeric"})}
                        </p>
                        <img
                                class="hourly-weather-image"
                                src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`}
                                alt=""
                        />
                        <p class="hourly-weather-temp">
                            {Math.round(hourData.temp)}&deg;
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</section>

<style>
    /* Translate Tailwind CSS styles here */
    .hourly-weather-section {
        max-width: 1024px;
        width: 100%;
        padding-top: 3rem;
        padding-bottom: 3rem;
        color: white;
    }

    .hourly-weather-wrapper {
        display: flex;
        gap: 2.5rem;
        overflow-x: auto;
    }

    .hourly-weather-title {
        margin-bottom: 1rem;
    }

    .hourly-weather-items {
        display: flex;
    }

    .hourly-weather-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .hourly-weather-time {
        white-space: nowrap;
        font-size: 1.125rem;
    }

    .hourly-weather-image {
        width: auto;
        height: 50px;
        object-fit: cover;
    }

    .hourly-weather-temp {
        font-size: 1.5rem;
    }
</style>