<script>
    import LocationsComponent from "./LocationsComponent.svelte";
    import {onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import SwitchUnitButton from "./SwitchUnitButton.svelte";
    import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
    import { t } from '$lib/stores/i18n.js';

    let searchQuery = '';
    /** @type {any[] | null} */
    let mapboxSearchResults = null;
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let queryTimeout;
    /** @type {boolean} */
    let searchError = false;
    let searching = false;

    const mapboxAPIKey = PUBLIC_MAPBOX_ACCESS_TOKEN;

    const getSearchResults = () => {
        clearTimeout(queryTimeout);
        if (searchQuery === '') {
            mapboxSearchResults = null;
            searching = false;
            return;
        }
        searching = true;
        queryTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxAPIKey}&types=place`);
                const data = await response.json();
                mapboxSearchResults = data.features;
            } catch {
                searchError = true;
            }
            searching = false;
        }, 300);
    };

    const previewCity = (/** @type {any} */ searchResult) => {
        const [city, state] = searchResult.place_name.split(",");
        const lat = searchResult.geometry.coordinates[1];
        const lng = searchResult.geometry.coordinates[0];

        window.location.href = `/weather/${encodeURIComponent(state.trim())}/${encodeURIComponent(city.trim())}?lat=${lat}&lng=${lng}&preview=true`;
        closeSearch();
    };

    const dispatch = createEventDispatcher();

    const closeSearch = () => {
        dispatch('close');
    };

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
                        placeholder={$t('search.placeholder')}
                        class="search-input bg-transparent"
                />

                <button class="clear-search__btn" on:click={() => {
                    if(searchQuery === '') {
                        closeSearch();
                    } else {
                        searchQuery = '';
                        mapboxSearchResults = null;
                        searching = false;
                    }
                }}>
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <div class="search-result__wrapper">
                {#if searching}
                    <div class="search-loading">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                {/if}

                {#if mapboxSearchResults}
                    <ul class="search-result__list py-2 px-1">
                        {#if searchError}
                            <p>{$t('search.error')}</p>
                        {/if}

                        {#if !searchError && mapboxSearchResults.length === 0}
                            <p>{$t('search.noResults')}</p>
                        {/if}

                        {#each mapboxSearchResults as searchResult (searchResult.id)}
                            <button
                                    class="search-result__item py-2 cursor-pointer"
                                    on:click={() => previewCity(searchResult)}
                            >
                                <div class="search-text__wrapper">
                                    <i class='bx bx-current-location'></i>
                                    {searchResult.place_name}
                                </div>
                                <div class="search-icon__wrapper">
                                    <i class='bx bx-search'></i>
                                </div>
                            </button>
                        {/each}
                    </ul>
                {/if}
            </div>
        </div>

        <div class="navigation-bottom__container">
            <SwitchUnitButton></SwitchUnitButton>
            <LocationsComponent {dispatch}/>
        </div>
    </div>
</div>

<style>
    .navigation-background {
        z-index: 10;
        width: 100vw;
        height: 100vh;
        background: var(--search-background);
        position: fixed;
        top: 0;
        left: 0;
    }

    .navigation-container {
        padding: .5em 1rem 2em;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (min-width: 1024px) {
        .navigation-background {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 80px;
        }

        .navigation-container {
            background: var(--search-background);
            border-radius: 20px;
            max-height: 80vh;
            height: auto;
            padding: 1.5em;
        }
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
        padding: 10px 30px;
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
        width: 100%;
        text-align: left;
        padding: 0.5em 0;
    }

    .search-result__item:hover {
        opacity: 0.7;
    }

    .search-loading {
        display: flex;
        justify-content: center;
        gap: 6px;
        padding: 1em;
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--light-grey);
        animation: pulse-dot 1s infinite;
    }

    .dot:nth-child(2) { animation-delay: 0.15s; }
    .dot:nth-child(3) { animation-delay: 0.3s; }

    @keyframes pulse-dot {
        0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1); }
    }

    .navigation-bottom__container {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }
</style>
