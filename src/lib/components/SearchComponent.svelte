<script>
    import {onMount, onDestroy} from 'svelte';

    let searchQuery = '';
    let mapboxSearchResults = null;
    let queryTimeout = null;

    const mapboxAPIKey = 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';

    const getSearchResults = () => {
        clearTimeout(queryTimeout);
        queryTimeout = setTimeout(async () => {
            if (searchQuery !== '') {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxAPIKey}&types=place`);
                const data = await response.json();
                mapboxSearchResults = data.features;
            } else {
                mapboxSearchResults = null;
            }
        }, 300);
    };

    const previewCity = (searchResult) => {
        console.log('Previewing city:', searchResult.place_name);
        // Add your logic for previewing a city here
    };

    // Cleanup function to clear the timeout
    onMount(() => {
        return () => {
            clearTimeout(queryTimeout);
        };
    });
</script>

<div class="container">
    <div class="search-wrapper">
        <button class="close-search__btn">
            <i class='bx bx-left-arrow-alt'></i>
        </button>

        <input
                type="text"
                bind:value={searchQuery}
                on:input={getSearchResults}
                placeholder="Search for a city"
                class="search-input bg-transparent"
        />

        <button class="clear-search__btn" on:click={() => {searchQuery = ''}}>
            <i class='bx bx-x'></i>
        </button>
    </div>


    {#if mapboxSearchResults}
        <ul
                class="search-result__list py-2 px-1"
        >
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

<style>
    .search-wrapper {
        position: relative;
    }

    .close-search__btn, .clear-search__btn {
        position: absolute;
        top: 11px;

    }

    .clear-search__btn {
        right: 0;
    }

    input {
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom-width: 1px;
        font-size: 100%;
        border-color: var(--light);
        outline: none;
        color: var(--light);
        width: 100%;
        padding: 10px 30px; /* Adjust the padding as needed */
    }

    input::placeholder {
        color: #9CA3AF;
    }

    input:focus {
        border-color: var(--dark-blue);
    }

    .search-wrapper i {
        font-size: 24px;
    }

    .search-result__list {

    }

    .search-result__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .search-text__wrapper {

    }

    .search-icon__wrapper {

    }
</style>