<script>
    import AnimatedPlaceholder from './AnimatedPlaceholder.svelte';
</script>

<section class="skeleton-hourly">
    <AnimatedPlaceholder class="skeleton-hourly-title" />
    <div class="skeleton-hourly-items">
        {#each Array(8) as _}
            <div class="skeleton-hourly-item">
                <AnimatedPlaceholder class="skeleton-hour-time" />
                <AnimatedPlaceholder class="skeleton-hour-icon" />
                <AnimatedPlaceholder class="skeleton-hour-temp" />
            </div>
        {/each}
    </div>
</section>

<style>
    .skeleton-hourly {
        padding: 3rem 0;
    }

    .skeleton-hourly-items {
        display: flex;
        gap: 1.5em;
        overflow: hidden;
    }

    .skeleton-hourly-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    :global(.skeleton-hourly-title) {
        width: 160px;
        height: 28px;
        margin-bottom: 1rem;
    }

    :global(.skeleton-hour-time) {
        width: 50px;
        height: 18px;
    }

    :global(.skeleton-hour-icon) {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    :global(.skeleton-hour-temp) {
        width: 40px;
        height: 24px;
    }
</style>
