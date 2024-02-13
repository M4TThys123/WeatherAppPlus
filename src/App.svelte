<script>
    import svelteLogo from './assets/svelte.svg'
    import viteLogo from '/vite.svg'
    import Counter from './lib/Counter.svelte'
    import HeaderComponent from "./lib/components/HeaderComponent.svelte";
    import HeroComponent from "./lib/components/HeroComponent.svelte";
    import ForecastComponent from "./lib/components/ForecastComponent.svelte";
</script>

<HeaderComponent></HeaderComponent>



<main>
    <HeroComponent ></HeroComponent>

    <ForecastComponent></ForecastComponent>
</main>

<style>
    main{
        padding: 0 1em;
    }

</style>
