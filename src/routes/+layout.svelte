<script>
	import Header from "$lib/components/partials/Header.svelte";
	import Footer from "$lib/components/partials/Footer.svelte";
	import WeatherAnimation from "$lib/components/WeatherAnimation.svelte";
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { weatherBg } from '$lib/stores/background.js';

	import './styles.css';
</script>

<div class="app-root" style="background: {$weatherBg.gradient};">
	<WeatherAnimation type={$weatherBg.animation} />

	<div class="app-content">
		<Header />

		{#key $page.url.pathname}
			<main class="main-container" in:fade={{ duration: 300, delay: 150 }} out:fade={{ duration: 150 }}>
				<slot />
			</main>
		{/key}

		<Footer />
	</div>
</div>

<style>
	.app-root {
		min-height: 100vh;
		position: relative;
		transition: background 1.5s ease;
		background-attachment: fixed;
	}

	.app-content {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-container {
		flex: 1;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 16px;
	}

	@media (min-width: 768px) {
		.main-container {
			padding: 0 24px;
		}
	}

	@media (min-width: 1024px) {
		.main-container {
			padding: 0 40px;
			max-width: 1200px;
		}
	}
</style>
