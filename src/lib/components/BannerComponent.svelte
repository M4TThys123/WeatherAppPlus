<script>
    import {page} from '$app/stores';
    import { t } from '$lib/stores/i18n.js';
    /** @type {boolean} */
    export let preview = false
</script>

{#if $page.url.pathname === '/'}
    <div class="banner-container">
        <section class="banner-section round">
            <p class="banner-text">{$t('banner.home')}</p>
        </section>
    </div>
{/if}

{#if preview}
    <section class="banner-section">
        <div class="banner-container text-center">
            <p>{$t('banner.preview')}</p>
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
