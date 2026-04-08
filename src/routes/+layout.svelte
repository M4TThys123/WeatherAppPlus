<script>
	// Import Components
	import Header from "$lib/components/partials/Header.svelte";
	import Footer from "$lib/components/partials/Footer.svelte";

	// Import Style
	import './styles.css';

	// Metric
	let units = 'metric'; // default to imperial
</script>


<div class="app">
	<Header></Header>


	<main class="max-w-7xl mx-auto px-6 md:px-12">
		<div class="flex flex-wrap">
			<slot {units}></slot>
		</div>
	</main>

   <Footer></Footer>
</div>

<style>
</style>
