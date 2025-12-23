<script lang="ts">
	import { onMount } from 'svelte';

	let { forceShow = false }: { forceShow?: boolean } = $props();

	let showPetals = $state(false);
	let petalsContainer = $state<HTMLDivElement>();

	function isSpringPeriod(): boolean {
		const now = new Date();
		const month = now.getMonth(); // 0-11
		const day = now.getDate();

		// Marzo (mese 2) dal giorno 20 in poi
		if (month === 2 && day >= 20) return true;

		// Aprile (mese 3) tutto il mese
		if (month === 3) return true;

		return false;
	}

	function createPetal() {
		if (!petalsContainer || !showPetals) return;

		const petal = document.createElement('div');
		petal.classList.add('petal');

		// Vari tipi di petali
		const petalTypes = ['🌸', '🌺', '🏵️'];
		petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];

		// Posizione iniziale random
		petal.style.left = Math.random() * 100 + '%';

		// Dimensione random (petali più piccoli e delicati)
		const size = Math.random() * 0.8 + 0.4; // 0.4 - 1.2
		petal.style.fontSize = size + 'rem';

		// Durata animazione random (caduta lenta e gentile)
		const duration = Math.random() * 12 + 10; // 10-22 secondi
		petal.style.animationDuration = duration + 's';

		// Delay random
		const delay = Math.random() * 3;
		petal.style.animationDelay = `-${delay}s`;

		// Opacità random (più trasparenti per effetto delicato)
		petal.style.opacity = (Math.random() * 0.4 + 0.5).toString(); // 0.5 - 0.9

		// Rimuovi il petalo quando l'animazione finisce
		petal.addEventListener('animationend', () => {
			if (petal.parentNode) {
				petal.remove();
			}
		});

		petalsContainer.appendChild(petal);
	}

	onMount(() => {
		showPetals = forceShow || isSpringPeriod();

		if (showPetals) {
			// Calcola la densità in base alla dimensione dello schermo
			const screenArea = window.innerWidth * window.innerHeight;
			const referenceArea = 1920 * 1080;
			const densityFactor = screenArea / referenceArea;
			const initialPetals = Math.max(15, Math.floor(45 * densityFactor));

			// Crea petali iniziali
			for (let i = 0; i < initialPetals; i++) {
				setTimeout(() => createPetal(), i * 180);
			}

			// Continua a creare nuovi petali
			const interval = setInterval(() => {
				if (Math.random() > 0.75) {
					// 25% di probabilità ogni 500ms
					createPetal();
				}
			}, 500);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

{#if showPetals}
	<div class="petals-container" bind:this={petalsContainer}></div>
{/if}

<style>
	.petals-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10001;
		overflow: hidden;
	}

	:global(.petal) {
		position: absolute;
		top: -100px;
		color: #ffb7d5;
		text-shadow:
			0 0 3px rgba(255, 183, 213, 0.6),
			0 0 8px rgba(255, 183, 213, 0.4);
		animation: sakura-fall linear infinite;
		pointer-events: none;
		user-select: none;
		will-change: transform;
	}

	@keyframes sakura-fall {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg);
		}
		25% {
			transform: translateY(calc(25vh)) translateX(40px) rotate(90deg);
		}
		50% {
			transform: translateY(calc(50vh)) translateX(-40px) rotate(180deg);
		}
		75% {
			transform: translateY(calc(75vh)) translateX(40px) rotate(270deg);
		}
		100% {
			transform: translateY(calc(100vh + 100px)) translateX(0) rotate(360deg);
		}
	}

	/* Movimento a spirale delicata */
	:global(.petal:nth-child(2n)) {
		animation-name: sakura-spiral;
	}

	@keyframes sakura-spiral {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg) scale(1);
		}
		25% {
			transform: translateY(calc(25vh)) translateX(-30px) rotate(120deg) scale(0.9);
		}
		50% {
			transform: translateY(calc(50vh)) translateX(30px) rotate(240deg) scale(1.1);
		}
		75% {
			transform: translateY(calc(75vh)) translateX(-30px) rotate(360deg) scale(0.95);
		}
		100% {
			transform: translateY(calc(100vh + 100px)) translateX(0) rotate(480deg) scale(1);
		}
	}

	/* Movimento fluttuante */
	:global(.petal:nth-child(3n)) {
		animation-name: sakura-flutter;
	}

	@keyframes sakura-flutter {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg) rotateX(0deg);
		}
		20% {
			transform: translateY(calc(20vh)) translateX(25px) rotate(72deg) rotateX(180deg);
		}
		40% {
			transform: translateY(calc(40vh)) translateX(-25px) rotate(144deg) rotateX(360deg);
		}
		60% {
			transform: translateY(calc(60vh)) translateX(25px) rotate(216deg) rotateX(180deg);
		}
		80% {
			transform: translateY(calc(80vh)) translateX(-25px) rotate(288deg) rotateX(360deg);
		}
		100% {
			transform: translateY(calc(100vh + 100px)) translateX(0) rotate(360deg) rotateX(0deg);
		}
	}
</style>
