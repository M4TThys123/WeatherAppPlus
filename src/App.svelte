<script>
    import Header from "./lib/components/Header.svelte";
    import Footer from "./lib/components/Footer.svelte";

    import HeroComponent from "./lib/components/HeroComponent.svelte";
    import ForecastComponent from "./lib/components/ForecastComponent.svelte";
    import LocationsComponent from "./lib/components/LocationsComponent.svelte";
</script>

<Header></Header>

<main class="container">
    <div class="row">
        <LocationsComponent></LocationsComponent>

        <HeroComponent></HeroComponent>

        <ForecastComponent></ForecastComponent>
    </div>
</main>

<Footer></Footer>

<style>
    main {
        margin-top: 2em;
        padding: 0 2em;
    }

</style>
