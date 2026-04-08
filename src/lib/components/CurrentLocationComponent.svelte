<script>
    import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';

    const mapboxAPIKey = PUBLIC_MAPBOX_ACCESS_TOKEN;

    const findMyLocation = () => {
        /** @param {GeolocationPosition} position */
        const success = (position) => {
            const lgn = position.coords.longitude;
            const lat = position.coords.latitude;

            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lgn},${lat}.json?access_token=${mapboxAPIKey}&types=place`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const [city, state] = data.features[0].place_name.split(",");
                    const redirectUrl = `/weather/${encodeURIComponent(state.trim())}/${encodeURIComponent(city.trim())}?lat=${lat}&lng=${lgn}&preview=true`;
                    window.location.href = redirectUrl;
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        };

        /** @param {GeolocationPositionError} err */
        const error = (err) => {
            console.error('Geolocation error:', err);
        };

        navigator.geolocation.getCurrentPosition(success, error);
    };
</script>

<button on:click={findMyLocation}>
    <i class='bx bx-current-location'></i>
</button>

<style>
    button {
        font-size: 24px;
        display: flex;
        align-items: center;
    }
</style>
