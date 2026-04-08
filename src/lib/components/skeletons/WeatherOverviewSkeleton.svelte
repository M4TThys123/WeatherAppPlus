<script>
    import AnimatedPlaceholder from './AnimatedPlaceholder.svelte';
</script>

<section class="skeleton-hero">
    <div class="skeleton-wrapper">
        <AnimatedPlaceholder class="skeleton-title" />
        <AnimatedPlaceholder class="skeleton-subtitle" />
        <AnimatedPlaceholder class="skeleton-temp" />
        <AnimatedPlaceholder class="skeleton-desc" />
        <AnimatedPlaceholder class="skeleton-icon" />
    </div>
</section>

<style>
    .skeleton-hero {
        display: flex;
        justify-content: center;
        padding: 3em 0;
    }

    .skeleton-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    :global(.skeleton-title) {
        width: 200px;
        height: 32px;
    }

    :global(.skeleton-subtitle) {
        width: 140px;
        height: 16px;
    }

    :global(.skeleton-temp) {
        width: 160px;
        height: 90px;
        margin: 8px 0;
    }

    :global(.skeleton-desc) {
        width: 180px;
        height: 20px;
    }

    :global(.skeleton-icon) {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
</style>
