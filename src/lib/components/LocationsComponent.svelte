<script>
    import CloudSvg from "./CloudSvg.svelte";
</script>

<section class="hero-section col-md-6">
    <div class="hero-wrapper">
        <div class="hero-top d-flex justify-content-between">
            <div>
                <h3 class="location-title">My location</h3>
                <span class="location-subtitle">Amsterdam</span>
            </div>

            <span class="location-temperature">8℃</span>
        </div>
        <section class="location-description">
            <span>Few Clouds</span>
        </section>
        <!--        <div class="location-icon__wrapper">-->
        <!--            <CloudSvg  ></CloudSvg>-->
        <!--        </div>-->
    </div>

</section>

<style>

    .hero-section{
        width: 100%;
        height: 115px;
        background: var(--dark-blue);
        border-radius: 25px;
        padding: 1em 1.5em;
    }
    .hero-wrapper{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .location-title{
        margin-bottom: -5px;
    }
    .location-subtitle{
        font-size: 14px;
    }
    .location-subtitle, .location-description{
        font-weight: bold;
    }

    .location-temperature{
        font-size: 40px;
        margin-top: -10px;
        font-weight: lighter;
    }
</style>