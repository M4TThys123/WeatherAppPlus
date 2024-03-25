<script>
    import HeroComponent from "$lib/components/HeroComponent.svelte";
    import ForecastComponent from "$lib/components/ForecastComponent.svelte";
    import BannerComponent from "$lib/components/BannerComponent.svelte";

    // export let units
    let units = "metric"


    console.log(`units zijn: ${units}`)

    import { onMount } from 'svelte';

    let weatherData;
    let lat = 0;
    let lng = 0;
    let preview



    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        lat = parseFloat(params.get('lat'));
        lng = parseFloat(params.get('lng'));
        preview = params.get('preview') === 'true'; // Parse as boolean
        console.log(preview);

        console.log(weatherData = await getWeatherData(lat, lng, units));
    });
</script>

<script context="module">
    export async function getWeatherData(lat, lng, units) {
        try {
            console.log(units)
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=${units}`
            );
            const weatherData = await response.json();

            // calculate current date & time
            const localOffset = new Date().getTimezoneOffset() * 60000;
            const utc = weatherData.current.dt * 1000 + localOffset;
            weatherData.currentTime = utc + 1000 * weatherData.timezone_offset;

            // calculate hourly weather offset
            weatherData.hourly.forEach((hour) => {
                const utc = hour.dt * 1000 + localOffset;
                hour.currentTime = utc + 1000 * weatherData.timezone_offset;
            });

            return weatherData;
        } catch (err) {
            console.log(err);
        }
    }
</script>

<BannerComponent {preview}></BannerComponent>

<HeroComponent {weatherData}></HeroComponent>

<ForecastComponent></ForecastComponent>