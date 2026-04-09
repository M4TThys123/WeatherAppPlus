<script>
    import SearchComponent from "../SearchComponent.svelte";
    import CurrentLocationComponent from "$lib/components/CurrentLocationComponent.svelte";
    import BaseModal from "$lib/components/BaseModal.svelte";
    import { page } from '$app/stores';
    import { addCity } from '$lib/stores/cities.js';
    import { language, t } from '$lib/stores/i18n.js';
    import { onMount } from 'svelte';

    let searchActive = false;
    let showSaved = false;
    let infoModalActive = false;
    let menuOpen = false;

    $: isPreview = $page.url.searchParams.get('preview') === 'true';
    $: cityName = $page.params.city || '';
    $: stateName = $page.params.state || '';

    function activateSearch() {
        menuOpen = false;
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
            menuOpen = false;
            setTimeout(() => { showSaved = false; }, 2000);
            const url = new URL(window.location.href);
            url.searchParams.delete('preview');
            window.history.replaceState({}, '', url.toString());
        }
    }

    function toggleLang() {
        language.update((l) => l === 'nl' ? 'en' : 'nl');
    }

    /** @param {MouseEvent} e */
    function handleClickOutside(e) {
        if (menuOpen && !(/** @type {HTMLElement} */ (e.target)).closest('.menu-panel, .hamburger-btn')) {
            menuOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            searchActive = false;
            document.body.classList.remove('no-scroll');
            document.removeEventListener('click', handleClickOutside);
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

        <!-- Desktop buttons -->
        <div class="desktop-buttons">
            <CurrentLocationComponent />

            {#if isPreview}
                <button class="icon-btn" on:click={saveCity} title={$t('actions.save')}>
                    {#if showSaved}
                        <i class='bx bx-check'></i>
                    {:else}
                        <i class='bx bx-plus'></i>
                    {/if}
                </button>
            {/if}

            <button class="icon-btn" on:click={() => infoModalActive = true} title={$t('actions.about')}>
                <i class='bx bx-info-circle'></i>
            </button>

            <button class="lang-toggle" on:click={toggleLang}>
                {$language === 'nl' ? 'EN' : 'NL'}
            </button>

            <button class="icon-btn" on:click={activateSearch}>
                <i class='bx bx-search'></i>
            </button>
        </div>

        <!-- Mobile buttons -->
        <div class="mobile-buttons">
            <button class="icon-btn" on:click={activateSearch}>
                <i class='bx bx-search'></i>
            </button>

            <button class="hamburger-btn" on:click={() => menuOpen = !menuOpen}>
                <i class='bx {menuOpen ? "bx-x" : "bx-menu"}'></i>
            </button>
        </div>
    </nav>

    <!-- Mobile menu panel -->
    {#if menuOpen}
        <div class="menu-panel">
            <CurrentLocationComponent />

            {#if isPreview}
                <button class="menu-item" on:click={saveCity}>
                    <i class='bx {showSaved ? "bx-check" : "bx-plus"}'></i>
                    {$t('actions.save')}
                </button>
            {/if}

            <button class="menu-item" on:click={() => { infoModalActive = true; menuOpen = false; }}>
                <i class='bx bx-info-circle'></i>
                {$t('actions.about')}
            </button>

            <button class="menu-item" on:click={toggleLang}>
                <i class='bx bx-globe'></i>
                {$language === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
            </button>
        </div>
    {/if}
</header>

{#if searchActive}
    <SearchComponent on:close={deactivateSearch}/>
{/if}

<BaseModal active={infoModalActive} on:close={() => infoModalActive = false}>
    <div class="about-content">
        <h2 class="about-title">{$t('about.title')}</h2>
        <p class="about-subtitle">{$t('about.subtitle')}</p>

        <div class="about-section">
            <h4>{$t('about.dataSources')}</h4>
            <p><strong>Weather:</strong> {$t('about.weatherSource')}</p>
            <p><strong>Geocoding:</strong> {$t('about.geocodingSource')}</p>
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
        position: relative;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    .icon-btn, .hamburger-btn {
        font-size: 24px;
        display: flex;
        align-items: center;
        transition: transform 0.2s;
    }

    .icon-btn:hover, .hamburger-btn:hover {
        transform: scale(1.1);
    }

    .lang-toggle {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.05em;
        padding: 4px 8px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        color: var(--light);
        transition: background 0.2s;
    }

    .lang-toggle:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    /* Desktop: show all buttons, hide hamburger */
    .desktop-buttons {
        display: none;
        gap: 0.75em;
        align-items: center;
    }

    .mobile-buttons {
        display: flex;
        gap: 0.5em;
        align-items: center;
    }

    @media (min-width: 768px) {
        .desktop-buttons {
            display: flex;
        }

        .mobile-buttons {
            display: none;
        }
    }

    /* Mobile menu */
    .menu-panel {
        position: absolute;
        top: 100%;
        right: 1rem;
        width: 240px;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 0.75em;
        display: flex;
        flex-direction: column;
        gap: 4px;
        z-index: 50;
        animation: slideDown 0.2s ease;
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 0.75em;
        padding: 0.6em 0.75em;
        border-radius: 10px;
        font-size: 14px;
        width: 100%;
        text-align: left;
        transition: background 0.15s;
    }

    .menu-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .menu-item i {
        font-size: 20px;
    }

    /* About modal */
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
