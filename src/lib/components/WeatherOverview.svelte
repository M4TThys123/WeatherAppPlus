<script>
    import {page} from '$app/stores';
    import {onMount} from "svelte";

    export let weatherData

    let city;
    let isLoading = true;

    onMount(() => {
        console.log($page.url)
        const parts = $page.url.pathname.split('/');
        city = parts[parts.length - 1];
        console.log(city);

        // Simulate loading delay
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    });
</script>

{#if isLoading}
    <div>Loading...</div>
{:else}
    <section class="hero-section col-md-6">
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
                { Math.round(weatherData.current.temp)}&deg;C
            </p>

            <section class="hero-description">
                <p class="hero-feeltemp">
                    Feels like { Math.round(weatherData.current.feels_like)}&deg;C
                </p>
                <!--                <p>Few Clouds</p>-->
                { weatherData.current.weather[0].description}
            </section>
            <div class="hero-icon__container">
                <div class="hero-icon__wrapper">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
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