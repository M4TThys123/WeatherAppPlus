<script>
    import SearchComponent from "../SearchComponent.svelte";
    import CurrentLocationComponent from "$lib/components/CurrentLocationComponent.svelte";
    import { page } from '$app/stores';
    import { addCity } from '$lib/stores/cities.js';
    import { onMount } from 'svelte';

    let searchActive = false;
    let showSaved = false;

    $: isPreview = $page.url.searchParams.get('preview') === 'true';
    $: cityName = $page.params.city || '';
    $: stateName = $page.params.state || '';

    function activateSearch() {
        searchActive = true;
        document.body.classList.add('no-scroll');
    }

    export function deactivateSearch() {
        searchActive = false;
        document.body.classList.remove('no-scroll');
    }

    function saveCity() {
        const lat = parseFloat($page.url.searchParams.get('lat') || '0');
        const lng = parseFloat($page.url.searchParams.get('lng') || '0');
        const added = addCity({ city: cityName, state: stateName, lat, lng });
        if (added) {
            showSaved = true;
            setTimeout(() => { showSaved = false; }, 2000);
            // Remove preview param from URL
            const url = new URL(window.location.href);
            url.searchParams.delete('preview');
            window.history.replaceState({}, '', url.toString());
        }
    }

    onMount(function () {
        return function () {
            searchActive = false;
            document.body.classList.remove('no-scroll');
        };
    });
</script>

<header class="header">
    <nav class="nav">
        <a href="/" class="logo-link">
            <div class="logo-wrapper">
                <i class='bx bx-sun'></i>
                <span class="brand-name">WeatherAppPlus</span>
            </div>
        </a>

        <div class="button-wrapper">
            <CurrentLocationComponent></CurrentLocationComponent>

            {#if isPreview}
                <button class="save-btn" on:click={saveCity} title="Save city">
                    {#if showSaved}
                        <i class='bx bx-check'></i>
                    {:else}
                        <i class='bx bx-plus'></i>
                    {/if}
                </button>
            {/if}

            <button class="search-btn" on:click={activateSearch}>
                <i class='bx bx-search'></i>
            </button>
        </div>
    </nav>
</header>

{#if searchActive}
    <SearchComponent on:close={deactivateSearch}/>
{/if}


<style>
    .header {
        margin: 0 auto;
        padding: 0.75rem 1rem;
        width: 100%;
        max-width: 1280px;
    }

    .nav {
        display: flex;
        justify-content: space-between;
    }

    .logo-wrapper {
        font-size: 24px;
        font-weight: 700;
        display: flex;
        align-items: center;
    }

    .brand-name {
        margin-left: 4px;
        color: var(--light);
    }

    .button-wrapper {
        display: flex;
        gap: 1em;
    }

    .search-btn, .save-btn {
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    .save-btn i {
        transition: transform 0.2s;
    }

    .save-btn:hover i {
        transform: scale(1.2);
    }
</style>
