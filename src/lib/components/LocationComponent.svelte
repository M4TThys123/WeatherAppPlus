<script>

    export let isMyLocation;
    export let dispatch

    function handleCloseClick() {
        dispatch('close');
    }
</script>

<section class="location-section col-md-6" on:click={handleCloseClick}>
    <div class="location-wrapper">
        <div class="location-top d-flex justify-content-between">
            <div>
                {#if isMyLocation}
                    <h3 class="location-title">Matthijs' location</h3>
                    <span class="location-subtitle">Obdam</span>
                {:else}
                    <h3 class="location-title">Amsterdam</h3>
                {/if}
            </div>

            <span class="location-temperature">8℃</span>
        </div>
        <section class="location-description">
            <span>Few Clouds</span>
        </section>
    </div>
</section>

<style>

    .location-section{
        width: 100%;
        height: 115px;
        background: var(--search-secondary-background);
        border-radius: 25px;
        padding: 1em 1.5em;
    }
    .location-wrapper{
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