<script>
import LocationComponent from "./LocationComponent.svelte";
export let dispatch;
</script>

<section class="locations-section col-md-6">
    <h2 class="mb-3">My Locations</h2>
    <LocationComponent isMyLocation={true} {dispatch}></LocationComponent>
    <LocationComponent isMyLocation={false} {dispatch}></LocationComponent>
<!--    <LocationComponent isMyLocation={false} ></LocationComponent>-->
</section>

<style>
    .locations-section{
        z-index: 9999;
        position: absolute;
        padding: 1em 2em;
        width: 100%;
        bottom: 1em;
    }

    @media (width >= 768px) {
        .locations-section {
            max-width: 350px;
            width: 50% !important;

        }
    }


</style>