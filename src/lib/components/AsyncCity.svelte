<script context="module">
    const APIkey = 'REMOVED_API_KEY'
    export async function getWeatherData(lat, lng) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=REMOVED_API_KEY&units=imperial`
                //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${APIkey}&units=imperial`

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

<script>
    // import { getWeatherData } from './path/to/module';
    import { onMount } from 'svelte';

    let weatherData;
    // Replace wit data from
    // let lat = /* provide actual latitude value */;
    // let lng = /* provide actual longitude value */;

    // Amsterdam coordinates
    let lat = 52.3676;
    let lng = 4.9041;

    onMount(async () => {
        console.log(weatherData = await getWeatherData(lat, lng));
        // weatherData = await getWeatherData(lat, lng)
    });
</script>

<!-- Your Svelte template -->
<div>
    <!-- Use weatherData here -->
</div>
