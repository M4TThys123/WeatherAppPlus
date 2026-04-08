<script>
	import Header from "$lib/components/partials/Header.svelte";
	import Footer from "$lib/components/partials/Footer.svelte";
	import WeatherAnimation from "$lib/components/WeatherAnimation.svelte";
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { weatherBg } from '$lib/stores/background.js';

	import './styles.css';
</script>

<WeatherAnimation type={$weatherBg.animation} />

<div class="app" style="background: {$weatherBg.gradient};">
	<Header></Header>

	{#key $page.url.pathname}
		<main class="max-w-7xl mx-auto px-6 md:px-12" in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 200 }}>
			<div class="flex flex-wrap">
				<slot></slot>
			</div>
		</main>
	{/key}

   <Footer></Footer>
</div>

<style>
	.app {
		position: relative;
		z-index: 1;
		transition: background 1.5s ease;
	}
</style>
