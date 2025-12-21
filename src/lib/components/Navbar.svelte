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
				const rain = document.createElement('span');
				rain.textContent = characters[Math.floor(Math.random() * characters.length)];
				rain.style.position = 'absolute';
				rain.style.left = Math.random() * 100 + '%';
				rain.style.top = '0';
				rain.style.color = 'var(--primary-color)';
				rain.style.fontSize = Math.random() * 6 + 10 + 'px';
				rain.style.opacity = (Math.random() * 0.3 + 0.2).toString();
				rain.style.pointerEvents = 'none';
				rain.style.animation = `matrixFall ${Math.random() * 1 + 1.5}s linear forwards`;
				navbarElement.appendChild(rain);

				setTimeout(() => rain.remove(), 2500);
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
	<div class="container" style="position: relative; z-index: 10;">
		<div class="nav-brand">Giuseppe Bellamacina</div>
		<ul class="nav-menu" class:active={isMenuActive}>
			<li><a href="#home" onclick={handleScroll}>Home</a></li>
			<li><a href="#about" onclick={handleScroll}>About</a></li>
			<li><a href="#experience" onclick={handleScroll}>Experience</a></li>
			<li><a href="#projects" onclick={handleScroll}>Projects</a></li>
			<li><a href="#skills" onclick={handleScroll}>Skills</a></li>
			<li><a href="#contact" onclick={handleScroll}>Contact</a></li>
		</ul>
		<div
			class="hamburger"
			class:active={isMenuActive}
			onclick={toggleMenu}
			onkeydown={(e) => e.key === 'Enter' && toggleMenu()}
			role="button"
			tabindex="0"
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</nav>
