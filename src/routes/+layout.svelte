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


	<main class="container">
		<div class="row">
			<slot {units}></slot>
		</div>
	</main>

   <Footer></Footer>
</div>

<style>
	main {
		padding: 0 2em;
	}
</style>
