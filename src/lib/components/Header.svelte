<script>
    import SearchComponent from "./SearchComponent.svelte";
</script>

<header class="header">
    <nav class="nav">
        <a href="/" class="logo-link">
            <div class="logo-wrapper">
                <i class='bx bx-sun'></i>
                <span class="brand-name">WeatherAppPlus</span>
            </div>
        </a>
        <button class="search-btn">
            <i class='bx bx-search'></i>
        </button>
    </nav>
</header>

<SearchComponent></SearchComponent>

<style>
    .header{
        padding: 0.75rem 1rem;

    }

    .nav{
        display: flex;
        justify-content: space-between;
    }
    .logo-wrapper{
        font-size: 24px;
        color: white;
        font-weight: 700;
        display: flex;
        align-items: center;
    }

    .brand-name{
        margin-left: 4px;
    }

    .search-btn{
        font-size: 24px;
        display: flex;
        align-items: center;
    }
</style>