<script>
    import {page} from '$app/stores';
    /** @type {boolean} */
    export let preview = false
</script>


{#if $page.url.pathname === '/'}
    <div class="banner-container">
        <section class="banner-section round blur">
<!--            <div class="image-container">-->
<!--                <img class="logo" src="https://avatars.githubusercontent.com/u/70703948?v=4"-->
<!--                     alt="Image of Matthijs Blauw"/>-->
<!--            </div>-->
            <p class="banner-text">You are currently previewing Matthijs' city, click the search icon to start tracking
                a city.</p>
        </section>
    </div>
{/if}

{#if preview}
    <section class="banner-section">
        <div class="banner-container text-center">
            <p>You are currently previewing this city, click the "+" icon to start tracking a
                city.</p>
        </div>
    </section>
{/if}


<style>
    .banner-container {
        padding: 0;
    }

    .banner-section {
        padding: 1em 1.5em;
        width: 100%;
        display: flex;
        gap: 1em;
        font-size: 13px;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        text-align: center;
        margin-bottom: 0.5em;
    }


</style>


