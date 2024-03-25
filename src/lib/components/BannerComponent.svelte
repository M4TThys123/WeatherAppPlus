<script>
    import {page} from '$app/stores';
    export let preview
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
        font-size: 14px;
        background: rgba(0, 0, 0, .5);
        border-radius: 25px;
        text-align: center;
    }

    .image-container {
        width: 25px;
        height: 25px;
    }

    .logo{
        width: 100%;
        height: 100%;
    }

</style>


