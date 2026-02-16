<script lang="ts">
	import { onMount } from 'svelte';
	import { setSeason, resetSeason } from '$lib/stores/seasonStore';

	let { forceShow = false }: { forceShow?: boolean } = $props();

	let showNewYear = $state(false);
	let newYearContainer = $state<HTMLDivElement>();

	function isNewYearPeriod(): boolean {
		const now = new Date();
		const month = now.getMonth(); // 0-11
		const day = now.getDate();

		// 31 Dicembre (mese 11)
		if (month === 11 && day === 31) return true;

		// 1-2 Gennaio (mese 0)
		if (month === 0 && day <= 2) return true;

		return false;
	}

	function createConfetti() {
		if (!newYearContainer || !showNewYear) return;

		const confetti = document.createElement('div');
		confetti.classList.add('confetti');

		// Colori vivaci per i coriandoli
		const colors = [
			'#ff6b6b',
			'#4ecdc4',
			'#45b7d1',
			'#f9ca24',
			'#6c5ce7',
			'#fd79a8',
			'#fdcb6e',
			'#00b894'
		];
		confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

		// Posizione iniziale random
		confetti.style.left = Math.random() * 100 + '%';
		confetti.style.top = '-20px';

		// Dimensione random
		const width = Math.random() * 8 + 4; // 4-12px
		const height = Math.random() * 15 + 10; // 10-25px
		confetti.style.width = width + 'px';
		confetti.style.height = height + 'px';

		// Opacità random
		confetti.style.opacity = (Math.random() * 0.3 + 0.7).toString(); // 0.7 - 1

		newYearContainer.appendChild(confetti);

		// Animazione con Web Animations API
		const duration = (Math.random() * 3 + 2) * 1000; // 2-5 secondi
		const shouldSpin = Math.random() > 0.5;

		const keyframes = shouldSpin
			? [
					{ transform: 'translateY(0) translateX(0) rotate(0deg)', offset: 0 },
					{ transform: `translateY(25vh) translateX(30px) rotate(180deg)`, offset: 0.25 },
					{ transform: `translateY(50vh) translateX(-30px) rotate(360deg)`, offset: 0.5 },
					{ transform: `translateY(75vh) translateX(30px) rotate(540deg)`, offset: 0.75 },
					{ transform: `translateY(calc(100vh + 50px)) translateX(0) rotate(720deg)`, offset: 1 }
				]
			: [
					{ transform: 'translateY(0) rotate(0deg)', offset: 0 },
					{ transform: `translateY(calc(100vh + 50px)) rotate(720deg)`, offset: 1 }
				];

		const animation = confetti.animate(keyframes, {
			duration: duration,
			easing: 'linear',
			fill: 'forwards'
		});

		animation.onfinish = () => {
			if (confetti.parentNode) {
				confetti.remove();
			}
		};
	}

	function createFirework() {
		if (!newYearContainer || !showNewYear) return;

		const firework = document.createElement('div');
		firework.classList.add('firework');

		// Posizione random per l'esplosione
		const left = Math.random() * 80 + 10; // 10-90%
		const top = Math.random() * 60 + 10; // 10-70%
		firework.style.left = left + '%';
		firework.style.top = top + '%';

		// Colore random
		const colors = [
			'#ff6b6b',
			'#4ecdc4',
			'#45b7d1',
			'#f9ca24',
			'#6c5ce7',
			'#fd79a8',
			'#fdcb6e',
			'#00b894',
			'#ffeaa7',
			'#74b9ff'
		];
		const color = colors[Math.floor(Math.random() * colors.length)];
		firework.style.setProperty('--firework-color', color);

		newYearContainer.appendChild(firework);

		// Usa Web Animations API per evitare conflitti
		// 50% di probabilità di avere rotazione
		const shouldRotate = Math.random() > 0.5;
		const keyframes = shouldRotate
			? [
					{ opacity: 0, transform: 'scale(0) rotate(0deg)' },
					{ opacity: 1, transform: 'scale(0.1) rotate(0deg)', offset: 0.1 },
					{ opacity: 1, transform: 'scale(1.5) rotate(180deg)', offset: 0.5 },
					{ opacity: 0, transform: 'scale(2) rotate(360deg)' }
				]
			: [
					{ opacity: 0, transform: 'scale(0)' },
					{ opacity: 1, transform: 'scale(0.1)', offset: 0.1 },
					{ opacity: 1, transform: 'scale(1.5)', offset: 0.5 },
					{ opacity: 0, transform: 'scale(2)' }
				];

		const animation = firework.animate(keyframes, {
			duration: 1500,
			easing: 'ease-out'
		});

		animation.onfinish = () => {
			if (firework.parentNode) {
				firework.remove();
			}
		};
	}

	onMount(() => {
		showNewYear = forceShow || isNewYearPeriod();

		if (showNewYear) {
			// Set the season in the store
			setSeason('newyear');

			// Calcola la densità in base alla dimensione dello schermo
			const screenArea = window.innerWidth * window.innerHeight;
			const referenceArea = 1920 * 1080;
			const densityFactor = screenArea / referenceArea;
			const initialConfetti = Math.max(20, Math.floor(60 * densityFactor));

			// Crea coriandoli iniziali
			for (let i = 0; i < initialConfetti; i++) {
				setTimeout(() => createConfetti(), i * 50);
			}

			// Continua a creare coriandoli
			const confettiInterval = setInterval(() => {
				if (Math.random() > 0.7) {
					// 30% di probabilità ogni 200ms
					createConfetti();
				}
			}, 200);

			// Crea fuochi d'artificio periodicamente
			const fireworkInterval = setInterval(() => {
				createFirework();
			}, 1200); // Ogni 1.2 secondi

			return () => {
				clearInterval(confettiInterval);
				clearInterval(fireworkInterval);
				resetSeason();
			};
		}
	});
</script>

{#if showNewYear}
	<div class="newyear-container" bind:this={newYearContainer}></div>
{/if}

<style>
	.newyear-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10001;
		overflow: hidden;
	}

	/* Coriandoli - stile statico, animazione gestita da JS */
	:global(.confetti) {
		position: absolute;
		pointer-events: none;
		user-select: none;
		will-change: transform;
	}

	/* Fuochi d'artificio - stile statico, animazione gestita da JS */
	:global(.firework) {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--firework-color);
		box-shadow:
			0 0 20px var(--firework-color),
			0 0 40px var(--firework-color),
			0 0 60px var(--firework-color),
			0 0 80px var(--firework-color),
			0 -50px 5px 2px var(--firework-color),
			0 50px 5px 2px var(--firework-color),
			-50px 0 5px 2px var(--firework-color),
			50px 0 5px 2px var(--firework-color),
			-35px -35px 5px 2px var(--firework-color),
			35px -35px 5px 2px var(--firework-color),
			-35px 35px 5px 2px var(--firework-color),
			35px 35px 5px 2px var(--firework-color);
		pointer-events: none;
		user-select: none;
	}
</style>
