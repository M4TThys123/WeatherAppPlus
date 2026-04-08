import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * @typedef {{ id: string, city: string, state: string, coords: { lat: number, lng: number } }} SavedCity
 */

const stored = browser ? localStorage.getItem('savedCities') : null;

/** @type {import('svelte/store').Writable<SavedCity[]>} */
export const savedCities = writable(stored ? JSON.parse(stored) : []);

if (browser) {
	savedCities.subscribe((value) => {
		localStorage.setItem('savedCities', JSON.stringify(value));
	});
}

/**
 * @param {{ city: string, state: string, lat: number, lng: number }} cityData
 */
export function addCity(cityData) {
	const cities = get(savedCities);
	const exists = cities.some(
		(c) => c.coords.lat === cityData.lat && c.coords.lng === cityData.lng
	);
	if (exists) return false;

	savedCities.update((list) => [
		...list,
		{
			id: crypto.randomUUID(),
			city: cityData.city,
			state: cityData.state,
			coords: { lat: cityData.lat, lng: cityData.lng }
		}
	]);
	return true;
}

/** @param {string} id */
export function removeCity(id) {
	savedCities.update((list) => list.filter((c) => c.id !== id));
}
