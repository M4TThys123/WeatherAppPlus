<button>
    <!--        on:click={findMyLocation()}>-->
    <i class='bx bx-current-location'></i>
</button>


<script>
    import { onMount } from "svelte";

    const findMyLocation = async () => {
        const success = async (position) => {
            console.log(position);
            const lgn = position.coords.longitude;
            const lat = position.coords.latitude;
            console.log(lgn, lat);

            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lgn}&localityLanguage=en`;

            try {
                const response = await fetch(geoApiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        const error = (err) => {
            console.log('error', err);
        };

        navigator.geolocation.getCurrentPosition(success, error);
    };

    onMount(() => {
        findMyLocation();
    });
</script>


<style>
    button {
        font-size: 24px;
        display: flex;
        align-items: center;
    }
</style>
