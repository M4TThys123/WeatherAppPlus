<script>
    import CloudSVG from "./images/CloudSVG.svelte";
    import { page } from '$app/stores';
    import { onMount } from "svelte";

    let city;
    let isLoading = true;

    onMount(() => {
        const parts = $page.url.pathname.split('/');
        city = parts[parts.length - 1];
        console.log(city);

        // Simulate loading delay
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    });
</script>

{#if isLoading}
    <div>Loading...</div>
{:else}
    <section class="hero-section col-md-6">
        <div class="hero-wrapper">
            {#if $page.url.pathname === '/'}
                <h2 class="hero-title">Matthijs' location</h2>
                <p class="hero-subtitle">Obdam</p>
            {:else}
                <h2 class="hero-title">{city}</h2>
            {/if}

            <p class="hero-temperature">8℃</p>
            <section class="hero-description">
                <p class="hero-feeltemp">Feels like 6℃</p>
                <p>Few Clouds</p>
            </section>
            <div class="hero-icon__container">
            <div class="hero-icon__wrapper">
                <CloudSVG></CloudSVG>
            </div>
            </div>
        </div>
    </section>
{/if}

<style>
    .hero-section {
        display: flex;
        justify-content: center;
    }

    .hero-wrapper {
        padding: 3em 0;
        text-align: center;
    }

    .hero-title {
        font-size: 32px;
        margin-bottom: 2px;
    }

    .hero-subtitle {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: bold;

    }

    .hero-temperature {
        margin-top: -2px;
        font-size: 100px;
        font-weight: lighter;
        margin-bottom: 2px;
    }

    .hero-description {
        font-size: 20px;
        font-weight: bold;
    }

    .hero-feeltemp {
        margin-bottom: 4px;
    }
    .hero-icon__container{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .hero-icon__wrapper {
        margin-top: -15px;
        width: 175px;
        height: 175px;
    }

</style>