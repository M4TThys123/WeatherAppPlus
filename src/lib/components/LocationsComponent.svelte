<script>
import LocationComponent from "./LocationComponent.svelte";
import MyLocationComponent from "./MyLocationComponent.svelte";
</script>

<section class="locations-section col-md-6">
    <MyLocationComponent></MyLocationComponent>
    <LocationComponent></LocationComponent>
</section>

<style>

    @media (width >= 768px) {
        .locations-section {
            max-width: 350px;
            width: 50% !important;

        }
    }


</style>