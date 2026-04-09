import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { translations } from '$lib/i18n/translations.js';

/** @type {import('svelte/store').Writable<'nl' | 'en'>} */
export const language = writable(
	browser ? /** @type {'nl' | 'en'} */ (localStorage.getItem('language') || 'nl') : 'nl'
);

if (browser) {
	language.subscribe((val) => localStorage.setItem('language', val));
}

/** Helper: returns translated string for a key */
export const t = derived(language, ($lang) => {
	return (/** @type {string} */ key) => {
		const keys = key.split('.');
		/** @type {any} */
		let value = translations[$lang];
		for (const k of keys) {
			value = value?.[k];
		}
		return value || key;
	};
});
