<script>

import CloudSVG from "./CloudSVG.svelte";
</script>

<section class="hero-section col-md-6">
    <div class="hero-wrapper">
        <h2 class="hero-title">My hero</h2>
        <p class="hero-subtitle">Amsterdam</p>
        <p class="hero-temperature">8℃</p>
        <section class="hero-description">
            <p class="hero-feeltemp">Feels like 6℃</p>
            <p>Few Clouds</p>
        </section>
        <div class="hero-icon__wrapper">
           <CloudSVG></CloudSVG>
        </div>
    </div>
</section>

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

    .hero-icon__wrapper {
        margin-top: -15px;
        width: 175px;
        height: 175px;
    }

    .hero-icon__wrapper svg {
        width: 100%;
        height: 100%;
    }
</style>