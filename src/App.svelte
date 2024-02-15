<script>
    import HeaderComponent from "./lib/components/HeaderComponent.svelte";
    import HeroComponent from "./lib/components/HeroComponent.svelte";
    import ForecastComponent from "./lib/components/ForecastComponent.svelte";
    import LocationsComponent from "./lib/components/LocationsComponent.svelte";
</script>

<HeaderComponent></HeaderComponent>

<main class="container">
    <div class="row">
        <LocationsComponent></LocationsComponent>

        <HeroComponent></HeroComponent>

        <ForecastComponent></ForecastComponent>
    </div>
</main>

<style>
    main {
        padding: 0 1em;
    }

</style>
