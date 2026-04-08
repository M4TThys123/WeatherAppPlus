import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<{ gradient: string, animation: string }>} */
export const weatherBg = writable({
	gradient: 'linear-gradient(to bottom, #1a6fad, #2d8fd4, #5ba8e0)',
	animation: 'none'
});
