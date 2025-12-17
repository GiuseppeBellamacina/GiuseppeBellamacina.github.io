<script lang="ts">
	import { onMount } from 'svelte';

	let isMenuActive = $state(false);
	let navbarElement: HTMLElement;
	let scrollY = $state(0);

	function toggleMenu() {
		isMenuActive = !isMenuActive;
	}

	function closeMenu() {
		isMenuActive = false;
	}

	function handleScroll(e: MouseEvent) {
		e.preventDefault();
		const target = e.currentTarget as HTMLAnchorElement;
		const href = target.getAttribute('href');
		if (href && href.startsWith('#')) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
		closeMenu();
	}

	// Matrix rain effect
	let isNavbarVisible = true;
	function createMatrixRain() {
		if (!navbarElement) return;

		const characters =
			'01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

		setInterval(() => {
			// Pausa se navbar non visibile
			if (!isNavbarVisible) return;
			// 70% spawn rate
			if (Math.random() > 0.3) {
				const char = document.createElement('div');
				char.textContent = characters[Math.floor(Math.random() * characters.length)];
				char.style.cssText = `
					position: absolute;
					top: 0;
					left: ${Math.random() * 100}%;
					color: var(--primary-color);
					font-size: ${10 + Math.random() * 6}px;
					opacity: ${0.2 + Math.random() * 0.3};
					pointer-events: none;
					animation: matrixFall ${1.5 + Math.random()}s linear forwards;
					z-index: 1;
				`;
				navbarElement.appendChild(char);

				setTimeout(() => {
					if (char.parentNode) {
						char.parentNode.removeChild(char);
					}
				}, 2500);
			}
		}, 50);
	}

	onMount(() => {
		// Update navbar background on scroll
		const handleScrollEffect = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScrollEffect);
		createMatrixRain();

		return () => {
			window.removeEventListener('scroll', handleScrollEffect);
		};
	});
</script>

<nav
	class="navbar"
	bind:this={navbarElement}
	style:background={scrollY > 100 ? 'rgba(10, 14, 39, 0.98)' : 'rgba(10, 14, 39, 0.95)'}
>
	<div class="container">
		<div class="nav-brand">Giuseppe Bellamacina</div>
		<ul class="nav-menu" class:active={isMenuActive}>
			<li><a href="#home" onclick={handleScroll}>Home</a></li>
			<li><a href="#about" onclick={handleScroll}>About</a></li>
			<li><a href="#experience" onclick={handleScroll}>Experience</a></li>
			<li><a href="#projects" onclick={handleScroll}>Projects</a></li>
			<li><a href="#skills" onclick={handleScroll}>Skills</a></li>
			<li><a href="#contact" onclick={handleScroll}>Contact</a></li>
		</ul>
		<button
			class="hamburger"
			class:active={isMenuActive}
			onclick={toggleMenu}
			aria-label="Toggle navigation menu"
			type="button"
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>

<style>
	/* Mobile menu active state */
	.nav-menu.active {
		left: 0;
	}

	/* Hamburger button reset */
	button.hamburger {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: none;
		flex-direction: column;
	}

	.hamburger.active span:nth-child(1) {
		transform: rotate(-45deg) translate(-5px, 6px);
	}

	.hamburger.active span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.active span:nth-child(3) {
		transform: rotate(45deg) translate(-5px, -6px);
	}

	@media (max-width: 768px) {
		button.hamburger {
			display: flex;
		}
	}
</style>
