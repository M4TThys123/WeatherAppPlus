<script>
    // Import Components
    import Header from "./lib/components/Header.svelte";
    import Footer from "./lib/components/Footer.svelte";

    import HeroComponent from "./lib/components/HeroComponent.svelte";
    import ForecastComponent from "./lib/components/ForecastComponent.svelte";

    // Import Packages
    import { Router, Route } from 'svelte-routing';

    // Variables
    let temperatureUnit = 'Celsius'; // Default temperature unit
    console.log('App.svelte:', temperatureUnit)
</script>

<Router>
    <Route path="/post/:id" component={HeroComponent} />
</Router>


<Header {temperatureUnit}></Header>

<main class="container">
    <div class="row">
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
