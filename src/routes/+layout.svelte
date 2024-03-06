<script>
	// Import Components
	import Header from "$lib/components/partials/Header.svelte";
	import Footer from "$lib/components/partials/Footer.svelte";

	// Import Style
	import './styles.css';
	import AsyncCity from "$lib/components/AsyncCity.svelte";
</script>

<AsyncCity></AsyncCity>

<div class="app">
	<Header></Header>

	<main class="container">
		<div class="row">
		<slot />
		</div>
	</main>

   <Footer></Footer>
</div>

<style>
	main {
		margin-top: 2em;
		padding: 0 2em;
	}
</style>
