<script>
import LocationComponent from "./LocationComponent.svelte";
import MyLocationComponent from "./MyLocationComponent.svelte";
</script>

<section class="locations-section col-md-6">
    <MyLocationComponent></MyLocationComponent>
    <LocationComponent></LocationComponent>
</section>

<style>
    .locations-section{
        z-index: 9999;
        position: absolute;
        padding: 1em;
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