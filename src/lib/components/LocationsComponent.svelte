<script>
import LocationComponent from "./LocationComponent.svelte";
import { savedCities } from '$lib/stores/cities.js';
import { t } from '$lib/stores/i18n.js';

/** @type {import('svelte').EventDispatcher<any>} */
export let dispatch;

const defaultLocation = {
    city: 'Obdam',
    state: 'NoordHolland',
    coords: { lat: 52.676145, lng: 4.90843 }
};
</script>

<section class="locations-section w-full md:w-1/2">
    <h2 class="mb-3">{$t('locations.title')}</h2>
    <div class="locations-wrapper">
        <LocationComponent location={defaultLocation} isMyLocation={true} {dispatch} />

        {#each $savedCities as city (city.id)}
            <LocationComponent location={city} isMyLocation={false} {dispatch} />
        {/each}

        {#if $savedCities.length === 0}
            <p class="empty-text">{$t('locations.emptyHint')}</p>
        {/if}
    </div>
</section>

<style>
    .locations-section {
        z-index: 9999;
        width: 100%;
        bottom: 1em;
    }

    .locations-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .empty-text {
        font-size: 14px;
        color: var(--light-grey);
        text-align: center;
        padding: 1em;
    }

    @media (width >= 768px) {
        .locations-section {
            max-width: 350px;
            width: 50% !important;
        }
    }
</style>
