<script>
    import SearchComponent from "./SearchComponent.svelte";
    import { onMount, onDestroy } from 'svelte';

    let searchActive = false;

    const activateSearch = () => {
        searchActive = true;
        document.body.classList.add('no-scroll'); // Add the class to disable scrolling
    };

    const deactivateSearch = () => {
        searchActive = false;
        document.body.classList.remove('no-scroll'); // Remove the class to enable scrolling
    };

    onMount(() => {
        return () => {
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
    <SearchComponent on:close={deactivateSearch} />
{/if}

<style>
    .header{
        padding: 0.75rem 1rem;
        max-width: 1280px;
        margin: 0 auto;
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