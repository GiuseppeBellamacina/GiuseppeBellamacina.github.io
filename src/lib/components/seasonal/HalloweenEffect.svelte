<script lang="ts">
	import { onMount } from 'svelte';

	let { forceShow = false }: { forceShow?: boolean } = $props();

	let showHalloween = $state(false);
	let halloweenContainer = $state<HTMLDivElement>();

	function isHalloweenPeriod(): boolean {
		const now = new Date();
		const month = now.getMonth(); // 0-11
		const day = now.getDate();

		// Ottobre (mese 9) dal giorno 20 al 31
		if (month === 9 && day >= 20 && day <= 31) return true;

		return false;
	}

	function createHalloweenElement() {
		if (!halloweenContainer || !showHalloween) return;

		const element = document.createElement('div');

		// Mix di elementi Halloween (senza pipistrelli)
		const halloweenElements = ['🎃', '👻', '🕷️'];
		const randomElement = halloweenElements[Math.floor(Math.random() * halloweenElements.length)];
		element.textContent = randomElement;

		// Tutti gli elementi cadono dall'alto
		element.classList.add('falling');
		element.style.left = Math.random() * 100 + '%';

		const size = Math.random() * 1.2 + 0.6; // 0.6 - 1.8
		element.style.fontSize = size + 'rem';

		const duration = Math.random() * 10 + 8; // 8-18 secondi
		element.style.animationDuration = duration + 's';
		// Rimuovi l'elemento quando l'animazione finisce
		element.addEventListener('animationend', () => {
			if (element.parentNode) {
				element.remove();
			}
		});

		halloweenContainer.appendChild(element);
	}

	onMount(() => {
		showHalloween = forceShow || isHalloweenPeriod();

		if (showHalloween) {
			// Calcola la densità in base alla dimensione dello schermo
			const screenArea = window.innerWidth * window.innerHeight;
			const referenceArea = 1920 * 1080;
			const densityFactor = screenArea / referenceArea;
			const initialElements = Math.max(8, Math.floor(25 * densityFactor));

			// Crea elementi iniziali
			for (let i = 0; i < initialElements; i++) {
				setTimeout(() => createHalloweenElement(), i * 300);
			}

			// Continua a creare nuovi elementi
			const interval = setInterval(() => {
				if (Math.random() > 0.82) {
					// 18% di probabilità ogni 700ms
					createHalloweenElement();
				}
			}, 700);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

{#if showHalloween}
	<div class="halloween-container" bind:this={halloweenContainer}></div>
{/if}

<style>
	.halloween-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10001;
		overflow: hidden;
	}

	:global(.bat) {
		position: absolute;
		animation: bat-fly linear infinite;
		pointer-events: none;
		user-select: none;
		will-change: transform;
		filter: drop-shadow(0 0 3px rgba(139, 69, 19, 0.5));
		--bat-direction: 1;
	}

	:global(.falling) {
		position: absolute;
		top: -50px;
		animation: halloween-fall linear infinite;
		pointer-events: none;
		user-select: none;
		will-change: transform;
		filter: drop-shadow(0 0 5px rgba(255, 140, 0, 0.4));
	}

	/* Animazione pipistrelli - volo orizzontale con ondulazione naturale */
	@keyframes bat-fly {
		0% {
			transform: translateX(calc(var(--bat-direction) * 0vw)) translateY(0) rotate(0deg);
		}
		10% {
			transform: translateX(calc(var(--bat-direction) * 10vw)) translateY(-15px)
				rotate(calc(var(--bat-direction) * 3deg));
		}
		25% {
			transform: translateX(calc(var(--bat-direction) * 25vw)) translateY(-25px)
				rotate(calc(var(--bat-direction) * 5deg));
		}
		40% {
			transform: translateX(calc(var(--bat-direction) * 40vw)) translateY(-10px)
				rotate(calc(var(--bat-direction) * 2deg));
		}
		50% {
			transform: translateX(calc(var(--bat-direction) * 50vw)) translateY(0) rotate(0deg);
		}
		60% {
			transform: translateX(calc(var(--bat-direction) * 60vw)) translateY(-18px)
				rotate(calc(var(--bat-direction) * -3deg));
		}
		75% {
			transform: translateX(calc(var(--bat-direction) * 75vw)) translateY(-28px)
				rotate(calc(var(--bat-direction) * -5deg));
		}
		90% {
			transform: translateX(calc(var(--bat-direction) * 90vw)) translateY(-12px)
				rotate(calc(var(--bat-direction) * -2deg));
		}
		100% {
			transform: translateX(calc(var(--bat-direction) * 105vw)) translateY(0) rotate(0deg);
		}
	}

	/* Animazione caduta per altri elementi */
	@keyframes halloween-fall {
		0% {
			transform: translateY(0) rotate(0deg);
		}
		100% {
			transform: translateY(calc(100vh + 100px)) rotate(360deg);
		}
	}

	/* Variazione di caduta con oscillazione */
	:global(.falling:nth-child(2n)) {
		animation-name: halloween-fall-swing;
	}

	@keyframes halloween-fall-swing {
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
</style>
