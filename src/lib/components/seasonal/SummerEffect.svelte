<script lang="ts">
	import { onMount } from 'svelte';
	import { setSeason, resetSeason } from '$lib/stores/seasonStore';

	let { forceShow = false }: { forceShow?: boolean } = $props();

	let showFireflies = $state(false);
	let firefliesContainer = $state<HTMLDivElement>();
	let maxFireflies = 0;
	let checkInterval: ReturnType<typeof setInterval>;

	function isSummerPeriod(): boolean {
		const now = new Date();
		const month = now.getMonth(); // 0-11

		// Giugno (mese 5), Luglio (mese 6), Agosto (mese 7)
		if (month >= 5 && month <= 7) return true;

		return false;
	}

	function createFirefly() {
		if (!firefliesContainer || !showFireflies) return;

		const firefly = document.createElement('div');
		firefly.classList.add('firefly');

		// Posizione iniziale random
		firefly.style.left = Math.random() * 100 + '%';
		firefly.style.top = Math.random() * 100 + '%';

		// Dimensione random
		const size = Math.random() * 0.3 + 0.2; // 0.2-0.5rem
		firefly.style.width = size + 'rem';
		firefly.style.height = size + 'rem';

		// Intensità luminosa random
		const intensity = Math.random() * 0.5 + 0.5; // 0.5-1
		firefly.style.setProperty('--glow-intensity', intensity.toString());

		firefliesContainer.appendChild(firefly);

		// Durate casuali per ogni lucciola - maggiore variabilità
		const lifeTime = Math.random() * 10000 + 3000; // 3-13 secondi di vita
		const fadeInDuration = Math.random() * 1000 + 1000; // 1-2 secondi
		const fadeOutDuration = Math.random() * 1000 + 1000; // 1-2 secondi
		const glowSpeed = Math.random() * 1500 + 2000; // 2-3.5 secondi

		// Movimento casuale
		const moveX = (Math.random() - 0.5) * 120;
		const moveY = (Math.random() - 0.5) * 120;

		// Una sola animazione per opacità e movimento
		const totalDuration = fadeInDuration + lifeTime + fadeOutDuration;
		const animation = firefly.animate(
			[
				// Fade-in
				{ opacity: 0, transform: 'translate(0, 0)', offset: 0 },
				{ opacity: 0.7, transform: 'translate(0, 0)', offset: fadeInDuration / totalDuration },
				// Vita
				{
					opacity: 0.7,
					transform: `translate(${moveX}px, ${moveY}px)`,
					offset: (fadeInDuration + lifeTime) / totalDuration
				},
				// Fade-out
				{ opacity: 0, transform: `translate(${moveX}px, ${moveY}px)`, offset: 1 }
			],
			{ duration: totalDuration, easing: 'ease-in-out' }
		);

		// Effetto pulsante separato
		const glow = firefly.animate(
			[
				{ filter: `brightness(0.5) drop-shadow(0 0 8px rgba(255, 235, 59, ${0.5 * intensity}))` },
				{ filter: `brightness(1.3) drop-shadow(0 0 15px rgba(255, 235, 59, ${0.8 * intensity}))` }
			],
			{ duration: glowSpeed, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
		);

		// Quando finisce, rimuove e basta (niente rigenerazione)
		animation.onfinish = () => {
			glow.cancel();
			if (firefly.parentNode) {
				firefly.remove();
			}
		};
	}

	function getCurrentFireflyCount(): number {
		return firefliesContainer?.querySelectorAll('.firefly').length || 0;
	}

	function maintainFireflyPopulation() {
		if (!showFireflies) return;

		const current = getCurrentFireflyCount();
		// Mantieni il numero tra 70% e 100% del massimo per più variazione
		const minFireflies = Math.floor(maxFireflies * 0.7);

		if (current < minFireflies) {
			// Aggiungi qualche lucciola
			const toAdd = Math.min(3, maxFireflies - current); // Max 3 alla volta
			for (let i = 0; i < toAdd; i++) {
				setTimeout(() => createFirefly(), Math.random() * 2000); // Distribuisci nei prossimi 2 secondi
			}
		}
	}

	onMount(() => {
		showFireflies = forceShow || isSummerPeriod();

		if (showFireflies) {
			// Set the season in the store
			setSeason('summer');

			// Calcola numero massimo in base allo schermo
			const screenArea = window.innerWidth * window.innerHeight;
			const referenceArea = 1920 * 1080;
			const densityFactor = screenArea / referenceArea;
			maxFireflies = Math.max(25, Math.floor(55 * densityFactor));

			// Crea lucciole iniziali gradualmente con timing più distribuito
			const initialCount = Math.floor(maxFireflies * 0.85); // Parti con l'85%
			for (let i = 0; i < initialCount; i++) {
				setTimeout(() => createFirefly(), Math.random() * 8000); // Nei primi 8 secondi
			}

			// Controlla ogni secondo se servono altre lucciole
			checkInterval = setInterval(maintainFireflyPopulation, 1000);

			return () => {
				clearInterval(checkInterval);
				resetSeason();
			};
		}
	});
</script>

{#if showFireflies}
	<div class="fireflies-container" bind:this={firefliesContainer}></div>
{/if}

<style>
	.fireflies-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10001;
		overflow: hidden;
	}

	:global(.firefly) {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle, #ffeb3b 0%, #ffd700 30%, transparent 70%);
		box-shadow:
			0 0 10px rgba(255, 235, 59, 0.8),
			0 0 20px rgba(255, 235, 59, 0.6),
			0 0 30px rgba(255, 235, 59, 0.4);
		pointer-events: none;
		user-select: none;
		will-change: transform, opacity, filter;
		--glow-intensity: 1;
		opacity: 0;
	}
</style>
