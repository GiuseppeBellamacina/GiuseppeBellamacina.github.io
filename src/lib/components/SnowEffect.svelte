<script lang="ts">
	import { onMount } from 'svelte';

	let showSnow = $state(false);
	let snowContainer = $state<HTMLDivElement>();

	function isChristmasPeriod(): boolean {
		const now = new Date();
		const month = now.getMonth(); // 0-11
		const day = now.getDate();

		// Dicembre (mese 11) dal giorno 1 in poi
		if (month === 11 && day >= 1) return true;

		// Gennaio (mese 0) fino al giorno 6
		if (month === 0 && day <= 6) return true;

		return false;
	}

	function createSnowflake() {
		if (!snowContainer || !showSnow) return;

		const snowflake = document.createElement('div');
		snowflake.classList.add('snowflake');
		snowflake.textContent = '❄';

		// Posizione iniziale random
		snowflake.style.left = Math.random() * 100 + '%';

		// Dimensione random
		const size = Math.random() * 1.5 + 0.5; // 0.5 - 2
		snowflake.style.fontSize = size + 'rem';

		// Durata animazione random (più lenta per atmosfera natalizia)
		const duration = Math.random() * 10 + 10; // 10-20 secondi
		snowflake.style.animationDuration = duration + 's';

		// Opacità random
		snowflake.style.opacity = (Math.random() * 0.6 + 0.4).toString(); // 0.4 - 1

		// Rimuovi il fiocco quando l'animazione finisce
		snowflake.addEventListener('animationend', () => {
			if (snowflake.parentNode) {
				snowflake.remove();
			}
		});

		snowContainer.appendChild(snowflake);
	}

	onMount(() => {
		showSnow = isChristmasPeriod();

		if (showSnow) {
			// Calcola la densità in base alla dimensione dello schermo
			// Dimensione di riferimento: 1920x1080 (desktop) = 50 fiocchi
			const screenArea = window.innerWidth * window.innerHeight;
			const referenceArea = 1920 * 1080; // Area di riferimento
			const densityFactor = screenArea / referenceArea;
			const initialFlakes = Math.max(15, Math.floor(50 * densityFactor)); // Minimo 15 fiocchi

			// Crea fiocchi iniziali
			for (let i = 0; i < initialFlakes; i++) {
				setTimeout(() => createSnowflake(), i * 200);
			}

			// Continua a creare nuovi fiocchi (anche la frequenza è proporzionale)
			const interval = setInterval(() => {
				if (Math.random() > 0.7) {
					// 30% di probabilità ogni 500ms
					createSnowflake();
				}
			}, 500);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

{#if showSnow}
	<div class="snow-container" bind:this={snowContainer}></div>
{/if}

<style>
	.snow-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10001;
		overflow: hidden;
	}

	:global(.snowflake) {
		position: absolute;
		top: -50px;
		color: #fff;
		text-shadow:
			0 0 5px #fff,
			0 0 10px #fff,
			0 0 20px rgba(255, 255, 255, 0.5);
		animation: snowfall linear infinite;
		pointer-events: none;
		user-select: none;
		will-change: transform;
	}

	@keyframes snowfall {
		0% {
			transform: translateY(0) rotate(0deg);
		}
		100% {
			transform: translateY(calc(100vh + 100px)) rotate(360deg);
		}
	}

	/* Variazioni di movimento per rendere più naturale */
	:global(.snowflake:nth-child(2n)) {
		animation-name: snowfall-wiggle;
	}

	@keyframes snowfall-wiggle {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg);
		}
		25% {
			transform: translateY(calc(25vh + 25px)) translateX(10px) rotate(90deg);
		}
		50% {
			transform: translateY(calc(50vh + 50px)) translateX(-10px) rotate(180deg);
		}
		75% {
			transform: translateY(calc(75vh + 75px)) translateX(10px) rotate(270deg);
		}
		100% {
			transform: translateY(calc(100vh + 100px)) translateX(0) rotate(360deg);
		}
	}
</style>
