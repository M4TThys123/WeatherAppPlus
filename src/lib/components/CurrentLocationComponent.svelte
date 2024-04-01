<button on:click={findMyLocation}>
    <i class='bx bx-current-location'></i>
</button>

<script>
    // import { onMount } from "svelte";

    let mapboxAPIKey = 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';

    const findMyLocation = async () => {
        const success = async (position) => {
            console.log(position);
            const lgn = position.coords.longitude;
            const lat = position.coords.latitude;
            console.log(lgn, lat);

            try {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lgn},${lat}.json?access_token=${mapboxAPIKey}&types=place`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);

                const [city, state] = data.features[0].place_name.split(",");
                const redirectUrl = `/weather/${state.trim().replaceAll(" ", "")}/${city.trim().replaceAll(" ", "")}?lat=${lat}&lng=${lgn}&preview=true`;
                window.location.href = redirectUrl;
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        const error = (err) => {
            console.log('error', err);
        };

        navigator.geolocation.getCurrentPosition(success, error);
    };
</script>


<style>
    button {
        font-size: 24px;
        display: flex;
        align-items: center;
    }
</style>
