import { writable } from 'svelte/store';

export type Season = 'default' | 'newyear' | 'snow' | 'halloween' | 'summer' | 'spring' | 'autumn';

export const currentSeason = writable<Season>('default');

export function setSeason(season: Season) {
	currentSeason.set(season);
}

export function resetSeason() {
	currentSeason.set('default');
}
