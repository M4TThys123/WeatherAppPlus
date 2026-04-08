import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const stored = browser ? localStorage.getItem('temperatureUnit') : null;

/** @type {import('svelte/store').Writable<'metric' | 'imperial'>} */
export const temperatureUnit = writable(stored === 'imperial' ? 'imperial' : 'metric');

if (browser) {
	temperatureUnit.subscribe((value) => {
		localStorage.setItem('temperatureUnit', value);
	});
}
