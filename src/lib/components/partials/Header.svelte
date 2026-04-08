<script>
    import SearchComponent from "../SearchComponent.svelte";
    import CurrentLocationComponent from "$lib/components/CurrentLocationComponent.svelte";
    import BaseModal from "$lib/components/BaseModal.svelte";
    import { page } from '$app/stores';
    import { addCity } from '$lib/stores/cities.js';
    import { onMount } from 'svelte';

    let searchActive = false;
    let showSaved = false;
    let infoModalActive = false;

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

            <button class="icon-btn" on:click={() => infoModalActive = true} title="About">
                <i class='bx bx-info-circle'></i>
            </button>

            <button class="icon-btn" on:click={activateSearch}>
                <i class='bx bx-search'></i>
            </button>
        </div>
    </nav>
</header>

{#if searchActive}
    <SearchComponent on:close={deactivateSearch}/>
{/if}

<BaseModal active={infoModalActive} on:close={() => infoModalActive = false}>
    <div class="about-content">
        <h2 class="about-title">WeatherAppPlus</h2>
        <p class="about-subtitle">Portfolio project built with SvelteKit & Open-Meteo</p>

        <div class="about-section">
            <h4>Data sources</h4>
            <p><strong>Weather:</strong> Open-Meteo (free, no API key)</p>
            <p><strong>Geocoding:</strong> Mapbox Geocoding API</p>
        </div>

        <div class="about-links">
            <a href="https://github.com/M4TThys123/WeatherAppPlus" target="_blank">
                <i class='bx bxl-github'></i> GitHub
            </a>
            <a href="https://www.matthijsblauw.nl/" target="_blank">
                <i class='bx bx-globe'></i> Portfolio
            </a>
        </div>
    </div>
</BaseModal>


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

    .icon-btn, .save-btn {
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    .save-btn i, .icon-btn i {
        transition: transform 0.2s;
    }

    .save-btn:hover i, .icon-btn:hover i {
        transform: scale(1.2);
    }

    .about-content {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .about-title {
        font-size: 22px;
        font-weight: 700;
    }

    .about-subtitle {
        font-size: 14px;
        color: var(--light-grey);
        margin-top: -0.5em;
    }

    .about-section h4 {
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--light-grey);
        margin-bottom: 0.5em;
    }

    .about-section p {
        font-size: 14px;
    }

    .about-links {
        display: flex;
        gap: 1.5em;
        margin-top: 0.5em;
    }

    .about-links a {
        display: flex;
        align-items: center;
        gap: 0.4em;
        font-size: 14px;
        font-weight: 600;
        color: var(--light);
    }

    .about-links a:hover {
        color: #8ab4f8;
    }
</style>
