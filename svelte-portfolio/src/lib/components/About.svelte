<script lang="ts">
	import { onMount } from 'svelte';

	let canvasElement: HTMLCanvasElement;
	let aboutSection: HTMLElement;
	let isVisible = false;

	interface Neuron {
		x: number;
		y: number;
		layer: number;
		radius: number;
		glow: number;
	}

	interface Connection {
		from: Neuron;
		to: Neuron;
		weight: number;
	}

	interface Impulse {
		from: Neuron;
		to: Neuron;
		progress: number;
		speed: number;
		trail: { x: number; y: number }[];
	}

	function createNeuralNetwork() {
		if (!canvasElement || !aboutSection) return;

		const ctx = canvasElement.getContext('2d');
		if (!ctx) return;

		function resizeCanvas() {
			canvasElement.width = aboutSection.offsetWidth;
			canvasElement.height = aboutSection.offsetHeight;
		}
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		// Define feedforward network structure: 5 layers
		const layers = [
			{ nodes: 5, x: 0.15 }, // Input layer
			{ nodes: 8, x: 0.35 }, // Hidden layer 1
			{ nodes: 6, x: 0.55 }, // Hidden layer 2
			{ nodes: 4, x: 0.75 }, // Hidden layer 3
			{ nodes: 3, x: 0.9 } // Output layer
		];

		const neurons: Neuron[] = [];
		const connections: Connection[] = [];

		// Create neurons for each layer
		layers.forEach((layer, layerIndex) => {
			const layerNeurons: Neuron[] = [];
			const spacing = canvasElement.height / (layer.nodes + 1);

			for (let i = 0; i < layer.nodes; i++) {
				const neuron: Neuron = {
					x: layer.x * canvasElement.width,
					y: (i + 1) * spacing,
					layer: layerIndex,
					radius: 6,
					glow: 0
				};
				neurons.push(neuron);
				layerNeurons.push(neuron);
			}

			// Create connections to previous layer
			if (layerIndex > 0) {
				const prevLayerNeurons = neurons.filter((n) => n.layer === layerIndex - 1);
				layerNeurons.forEach((neuron) => {
					prevLayerNeurons.forEach((prevNeuron) => {
						connections.push({
							from: prevNeuron,
							to: neuron,
							weight: Math.random() * 0.5 + 0.3
						});
					});
				});
			}
		});

		let time = 0;

		// Impulse system for forward propagation
		const impulses: Impulse[] = [];
		setInterval(() => {
			// Create impulses from input layer (8% spawn rate)
			const inputNeurons = neurons.filter((n) => n.layer === 0);
			inputNeurons.forEach((neuron) => {
				if (Math.random() < 0.08) {
					const nextConnections = connections.filter((c) => c.from === neuron);
					nextConnections.forEach((conn) => {
						impulses.push({
							from: conn.from,
							to: conn.to,
							progress: 0,
							speed: 0.015 + Math.random() * 0.01,
							trail: []
						});
					});
				}
			});
		}, 600);

		function animate() {
			if (!isVisible) {
				requestAnimationFrame(animate);
				return;
			}

			ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
			time += 0.01;

			// Draw connections with subtle pulse
			connections.forEach((conn) => {
				const opacity = 0.15 + Math.sin(time + conn.weight * 10) * 0.05;
				ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(conn.from.x, conn.from.y);
				ctx.lineTo(conn.to.x, conn.to.y);
				ctx.stroke();
			});

			// Update and draw impulses
			for (let i = impulses.length - 1; i >= 0; i--) {
				const impulse = impulses[i];
				impulse.progress += impulse.speed;

				const x = impulse.from.x + (impulse.to.x - impulse.from.x) * impulse.progress;
				const y = impulse.from.y + (impulse.to.y - impulse.from.y) * impulse.progress;

				// Add to trail
				impulse.trail.push({ x, y });
				if (impulse.trail.length > 5) {
					impulse.trail.shift();
				}

				// Draw trail
				impulse.trail.forEach((point, idx) => {
					const trailOpacity = (idx / impulse.trail.length) * 0.8;
					ctx.fillStyle = `rgba(0, 255, 157, ${trailOpacity})`;
					ctx.beginPath();
					ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
					ctx.fill();
				});

				// Draw main impulse
				ctx.fillStyle = 'rgba(0, 255, 157, 1)';
				ctx.shadowBlur = 10;
				ctx.shadowColor = 'rgba(0, 255, 157, 0.8)';
				ctx.beginPath();
				ctx.arc(x, y, 3, 0, Math.PI * 2);
				ctx.fill();
				ctx.shadowBlur = 0;

				// Neuron glow on impact
				if (impulse.progress >= 1) {
					impulse.to.glow = 1;

					// 25% chance to propagate to next layer
					if (Math.random() < 0.25) {
						const nextConnections = connections.filter((c) => c.from === impulse.to);
						nextConnections.forEach((conn) => {
							impulses.push({
								from: conn.from,
								to: conn.to,
								progress: 0,
								speed: 0.015 + Math.random() * 0.01,
								trail: []
							});
						});
					}

					impulses.splice(i, 1);
				}
			}

			// Draw neurons with glow effect
			neurons.forEach((neuron) => {
				// Decay glow
				if (neuron.glow > 0) {
					neuron.glow -= 0.02;
				}

				// Determine color based on layer
				let color;
				if (neuron.layer === 0) {
					color = 'rgba(0, 255, 157, '; // Input - green
				} else if (neuron.layer === layers.length - 1) {
					color = 'rgba(255, 0, 255, '; // Output - magenta
				} else {
					color = 'rgba(0, 217, 255, '; // Hidden - cyan
				}

				// Base neuron
				ctx.fillStyle = color + '0.6)';
				ctx.beginPath();
				ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
				ctx.fill();

				// Glow effect
				if (neuron.glow > 0) {
					ctx.fillStyle = color + neuron.glow + ')';
					ctx.shadowBlur = 20;
					ctx.shadowColor = color + '1)';
					ctx.beginPath();
					ctx.arc(neuron.x, neuron.y, neuron.radius + 4, 0, Math.PI * 2);
					ctx.fill();
					ctx.shadowBlur = 0;
				}

				// Neuron border
				ctx.strokeStyle = color + '1)';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
				ctx.stroke();
			});

			requestAnimationFrame(animate);
		}

		animate();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}

	onMount(() => {
		// IntersectionObserver for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						createNeuralNetwork();
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (aboutSection) {
			observer.observe(aboutSection);
		}

		return () => {
			if (aboutSection) {
				observer.unobserve(aboutSection);
			}
		};
	});
</script>

<section id="about" class="about" bind:this={aboutSection}>
	<canvas class="neural-canvas" bind:this={canvasElement}></canvas>
	<div class="container">
		<h2 class="section-title">💫 About Me</h2>
		<div class="about-content">
			<div class="about-text">
				<p>
					Hi there! 👋 I'm Giuseppe, a Computer Science student at the University of Catania. I'm
					passionate about Artificial Intelligence and Cybersecurity, always diving into new
					challenges and exploring the unknown.
				</p>
				<p>
					Most of the time, I just end up doing weird stuff because, well... <strong
						>Sbaddu Supecchiu</strong
					>.
				</p>
				<p>
					I'm a huge fan of Marvel and Star Wars universe, but I'm just as obsessed with anime and
					way too many other things to list here. I also have a deep love for video games.
				</p>
				<p>
					Oh, and I have a thing for cars. I drive. <em>(Yes, I'm Ryan Gosling)</em>.
				</p>

				<div class="currently-working">
					<h3>🚀 Currently Working On</h3>
					<ul>
						<li>
							<strong
								><a
									href="https://github.com/GiuseppeBellamacina/Image-Enhancement"
									target="_blank">Image Enhancement</a
								></strong
							>
							- Exploring advanced techniques for image quality improvement
						</li>
						<li>An <strong>AI to conquer the world</strong> (I'm joking... maybe)</li>
						<li><strong>Survive</strong></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.neural-canvas {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		height: 80%;
		max-width: 1400px;
		max-height: 800px;
		pointer-events: none;
		z-index: 1;
	}
</style>
