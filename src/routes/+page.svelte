<script>
import HeroComponent from "$lib/components/HeroComponent.svelte";
import ForecastComponent from "$lib/components/ForecastComponent.svelte";
import BannerComponent from "$lib/components/BannerComponent.svelte";

import { onMount } from 'svelte';

// export let units
// console.log(units)

let units = "metric"


let weatherData;
let lat = 52.676145;
let lng = 4.90843;
const city = "Obdam"

onMount(async () => {
	console.log(city)
	console.log(weatherData = await getWeatherData(lat, lng, units));
});
</script>

<script context="module">
	export async function getWeatherData(lat, lng, units) {
		try {
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

<svelte:head>
	<title>Home</title>
</svelte:head>

<BannerComponent></BannerComponent>

<HeroComponent {weatherData}></HeroComponent>

<ForecastComponent></ForecastComponent>


<style>

</style>



