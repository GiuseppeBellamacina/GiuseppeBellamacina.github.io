<script lang="ts">
	import { onMount } from 'svelte';

	interface Particle {
		x: number;
		y: number;
		opacity: number;
		size: number;
		hue: number;
		velocityX: number;
		velocityY: number;
		rotation: number;
		rotationSpeed: number;
	}

	let particles: Particle[] = [];
	let cursorX = 0;
	let cursorY = 0;
	let lastTime = Date.now();
	let hueBase = 0;

	function createParticle(x: number, y: number) {
		// Create multiple smaller particles for a more star-like effect
		const particleCount = 2;
		const newParticles = [];

		for (let i = 0; i < particleCount; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = Math.random() * 0.5;

			newParticles.push({
				x: x + (Math.random() - 0.5) * 10,
				y: y + (Math.random() - 0.5) * 10,
				opacity: 0.9,
				size: Math.random() * 3 + 2,
				hue: (hueBase + Math.random() * 60 - 30) % 360,
				velocityX: Math.cos(angle) * speed,
				velocityY: Math.sin(angle) * speed,
				rotation: Math.random() * 360,
				rotationSpeed: (Math.random() - 0.5) * 10
			});
		}

		particles = [...particles.slice(-25), ...newParticles];
	}

	function updateParticles() {
		particles = particles
			.map((p) => ({
				...p,
				x: p.x + p.velocityX,
				y: p.y + p.velocityY,
				opacity: p.opacity - 0.025,
				rotation: p.rotation + p.rotationSpeed,
				size: p.size * 0.98
			}))
			.filter((p) => p.opacity > 0 && p.size > 0.5);
	}

	function handleMouseMove(e: MouseEvent) {
		cursorX = e.clientX;
		cursorY = e.clientY;

		const now = Date.now();
		// Create particles more frequently for smoother trail
		if (now - lastTime > 30) {
			createParticle(e.clientX, e.clientY);
			lastTime = now;
			hueBase = (hueBase + 1) % 360; // Cycle through colors
		}
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);

		const interval = setInterval(updateParticles, 30);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(interval);
		};
	});
</script>

<div class="cursor-trail">
	{#each particles as particle, i (i)}
		<div
			class="particle"
			style="
				left: {particle.x}px;
				top: {particle.y}px;
				opacity: {particle.opacity};
				width: {particle.size}px;
				height: {particle.size}px;
				transform: translate(-50%, -50%) rotate({particle.rotation}deg);
				background: radial-gradient(circle, 
					hsla({particle.hue}, 100%, 70%, {particle.opacity}), 
					hsla({particle.hue}, 100%, 50%, {particle.opacity * 0.6}) 40%,
					transparent 70%
				);
				box-shadow: 0 0 {particle.size * 2}px hsla({particle.hue}, 100%, 60%, {particle.opacity * 0.8});
			"
		></div>
	{/each}
</div>

<style>
	.cursor-trail {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
	}

	.particle {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		filter: blur(0.5px);
		animation: particleTwinkle 0.6s ease-in-out infinite;
	}

	@keyframes particleTwinkle {
		0%,
		100% {
			filter: blur(0.5px) brightness(1);
		}
		50% {
			filter: blur(1px) brightness(1.3);
		}
	}

	@media (max-width: 768px) {
		.cursor-trail {
			display: none;
		}
	}
</style>
