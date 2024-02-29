<script>
import LocationComponent from "./LocationComponent.svelte";
export let dispatch;
</script>

<section class="locations-section col-md-6">
    <h2 class="mb-3">My Locations</h2>
    <div class="locations-wrapper">
        <LocationComponent isMyLocation={true} {dispatch}></LocationComponent>
        <LocationComponent isMyLocation={false} {dispatch}></LocationComponent>
    </div>

</section>

<style>
    .locations-section{
        z-index: 9999;
        width: 100%;
        bottom: 1em;
    }

    .locations-wrapper{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    @media (width >= 768px) {
        .locations-section {
            max-width: 350px;
            width: 50% !important;

        }
    }


</style>