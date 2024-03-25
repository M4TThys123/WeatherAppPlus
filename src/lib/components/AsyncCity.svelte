<script context="module">
    const APIkey = 'd45c14881afb57e1425ff32ace6410a3'
    export async function getWeatherData(lat, lng) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
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
    import { onMount } from 'svelte';

    let weatherData;
    let lat = 0;
    let lng = 0;

    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        lat = parseFloat(params.get('lat'));
        lng = parseFloat(params.get('lng'));

        console.log(weatherData = await getWeatherData(lat, lng));
    });
</script>
