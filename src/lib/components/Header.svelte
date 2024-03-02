<script>
    // Import components
    import SearchComponent from "./SearchComponent.svelte";

    import { onMount, onDestroy } from 'svelte';
    import AsyncCity from "./AsyncCity.svelte";

    let searchActive = false;

    function activateSearch() {
        searchActive = true;
        document.body.classList.add('no-scroll'); // Add the class to disable scrolling
    }

    export function deactivateSearch() {
        searchActive = false;
        document.body.classList.remove('no-scroll');
    }

    // Using function expression for onMount
    onMount(function() {
        // Returning a cleanup function
        return function() {
            searchActive = false;
            document.body.classList.remove('no-scroll'); // Ensure scrolling is enabled when component is destroyed
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
        <button class="search-btn" on:click={activateSearch}>
            <i class='bx bx-search'></i>
        </button>
    </nav>
</header>

{#if searchActive}
    <SearchComponent on:close={deactivateSearch}/>
{/if}

<AsyncCity></AsyncCity>

<style>
    .header{
        margin: 0 auto;
        padding: 0.75rem 1rem;
        width: 100%;
        max-width: 1280px;
    }

    .nav{
        display: flex;
        justify-content: space-between;
    }
    .logo-wrapper{
        font-size: 24px;
        font-weight: 700;
        display: flex;
        align-items: center;
    }

    .brand-name{
        margin-left: 4px;
        color: var(--light);
    }

    .search-btn{
        font-size: 24px;
        display: flex;
        align-items: center;
    }
</style>