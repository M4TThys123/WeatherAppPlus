<script>
    import AnimatedPlaceholder from './AnimatedPlaceholder.svelte';
</script>

<section class="skeleton-forecast">
    <AnimatedPlaceholder class="skeleton-forecast-heading" />
    {#each Array(7) as _}
        <div class="skeleton-forecast-row">
            <AnimatedPlaceholder class="skeleton-forecast-day" />
            <AnimatedPlaceholder class="skeleton-forecast-icon" />
            <AnimatedPlaceholder class="skeleton-forecast-temp" />
        </div>
    {/each}
</section>

<style>
    .skeleton-forecast {
        width: 100%;
        background: var(--dark-blue);
        border-radius: 25px;
        padding: 1em 1.5em;
        margin-bottom: 2.5rem;
    }

    .skeleton-forecast-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
    }

    :global(.skeleton-forecast-heading) {
        width: 140px;
        height: 16px;
    }

    :global(.skeleton-forecast-day) {
        width: 50px;
        height: 24px;
    }

    :global(.skeleton-forecast-icon) {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    :global(.skeleton-forecast-temp) {
        width: 100px;
        height: 18px;
    }
</style>
