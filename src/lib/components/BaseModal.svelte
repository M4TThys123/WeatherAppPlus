<script>
    import { fade, scale } from 'svelte/transition';
    import { createEventDispatcher, onMount } from 'svelte';

    export let active = false;

    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.key === 'Escape') close();
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

{#if active}
    <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={close} role="presentation">
        <div class="modal-content" transition:scale={{ duration: 250, start: 0.9 }} on:click|stopPropagation role="dialog" aria-modal="true">
            <button class="modal-close" on:click={close}>
                <i class='bx bx-x'></i>
            </button>
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1em;
    }

    .modal-content {
        background: rgba(30, 35, 50, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 2em;
        max-width: 400px;
        width: 100%;
        position: relative;
        color: var(--light);
    }

    .modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 24px;
        padding: 4px;
    }

    .modal-close:hover {
        opacity: 0.7;
    }
</style>
