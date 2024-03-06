<script>
    // Import Components
    import LocationsComponent from "./LocationsComponent.svelte";

    import {onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import SwitchUnitButton from "./SwitchUnitButton.svelte";

    let searchQuery = '';
    let mapboxSearchResults = null;
    let queryTimeout = null;
    let searchError = null;
    let temperatureUnit = 'Celsius'; // Default temperature unit

    const mapboxAPIKey = 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';

    const getSearchResults = () => {
        clearTimeout(queryTimeout);
        queryTimeout = setTimeout(async () => {
            if (searchQuery !== '') {
                try {
                    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxAPIKey}&types=place`);
                    const data = await response.json();
                    mapboxSearchResults = data.features;
                    console.log(mapboxSearchResults)
                } catch {
                    searchError.value = true
                }
            } else {
                mapboxSearchResults = null; // Reset search results if query is empty
            }
        }, 300);
    };

    const previewCity = (searchResult) => {
        const [city, state] = searchResult.place_name.split(",");
        const lat = searchResult.geometry.coordinates[1];
        const lng = searchResult.geometry.coordinates[0];

        // Redirect to the city view with parameters
        window.location.href = `/weather/${state.trim().replaceAll(" ", "")}/${city.trim().replaceAll(" ", "")}?lat=${lat}&lng=${lng}&preview=true`;
        closeSearch()
    };

    const dispatch = createEventDispatcher();

    const closeSearch = () => {
        dispatch('close');
    };

    const toggleTemperatureUnit = () => {
        temperatureUnit = temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
        console.log(temperatureUnit)
    };

    // Cleanup function to clear the timeout
    onMount(() => {
        return () => {
            clearTimeout(queryTimeout);
        };
    });
</script>

<div class="navigation-background">
    <div class="navigation-container">
        <div class="search-container">
            <div class="search-wrapper">
                <button class="close-search__btn" on:click={closeSearch}>
                    <i class='bx bx-left-arrow-alt'></i>
                </button>

                <input
                        type="text"
                        bind:value={searchQuery}
                        on:input={getSearchResults}
                        placeholder="Search for a city"
                        class="search-input backround bg-transparent"
                />

                <button class="clear-search__btn" on:click={() => {
                    if(searchQuery === '') {
                        closeSearch();
                    } else {
                        searchQuery = '';
                        mapboxSearchResults = null;
                    }
                }}>
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <div class="search-result__wrapper">
                {#if mapboxSearchResults}
                    <ul
                            class="search-result__list py-2 px-1"
                    >
                        {#if searchError}
                            <p>Sorry, something went wrong, please try again.</p>
                        {/if}

                        {#if !searchError && mapboxSearchResults.length === 0}
                            <p>No results match your query, try a different term.</p>
                        {/if}

                        {#each mapboxSearchResults as searchResult (searchResult.id)}
                            <li
                                    class="search-result__item py-2 cursor-pointer "
                                    on:click={() => previewCity(searchResult)}
                            >
                                <div class="search-text__wrapper">
                                    <i class='bx bx-current-location'></i>

                                    {searchResult.place_name}
                                </div>
                                <div class="search-icon__wrapper">
                                    <i class='bx bx-search'></i>
                                </div>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        </div>

        <div class="navigation-bottom__container">
            <SwitchUnitButton {toggleTemperatureUnit}></SwitchUnitButton>

            <LocationsComponent {dispatch}/>
        </div>
    </div>
</div>

<style>
    .navigation-background {
        z-index: 1;
        width: 100vw;
        height: 100vh;
        background: var(--search-background);
        position: absolute;
        top: 0;
        left: 0;
    }

    .navigation-container{
        padding: .5em 1rem 2em;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .search-container {

    }

    .search-result__wrapper {
        z-index: 10 !important;
    }

    .search-wrapper {
        position: relative;
    }


    .close-search__btn, .clear-search__btn {
        position: absolute;
        top: 11px;

    }

    .close-search__btn i {
        margin-left: -4px;
        margin-top: -6px;
    }

    .clear-search__btn {
        right: 0;
    }

    .clear-search__btn i {
        margin-right: -4px;
        margin-top: -6px;
    }

    input {
        width: 100%;

        /*margin-top: 7px;*/
        padding-left: 4px;
        padding: 10px 30px; /* Adjust the padding as needed */

        background: var(--search-secondary-background);
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom-width: 1px;
        border-color: var(--light);
        outline: none;

        color: var(--light);
        font-size: 100%;
    }



    input::placeholder {
        color: #9CA3AF;
    }

    input:focus {
        border-color: var(--dark-blue);
    }

    .search-wrapper i {
        font-size: 34px;
    }

    .search-result__list {
        z-index: 3 !important;
    }

    .search-result__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .navigation-bottom__container{
        display: flex;
        flex-direction: column;
        gap: .5em;
    }
</style>