<script lang="ts">
	import { onMount } from 'svelte';

	let skillsSection: HTMLElement;
	let isVisible = false;

	interface TechIcon {
		name: string;
		icon: string;
	}

	interface SkillCategory {
		title: string;
		emoji: string;
		icons: TechIcon[];
	}

	const skillCategories: SkillCategory[] = [
		{
			title: 'Languages',
			emoji: '🔤',
			icons: [
				{ name: 'Python', icon: 'python-original.svg' },
				{ name: 'C', icon: 'c-original.svg' },
				{ name: 'C++', icon: 'cplusplus-original.svg' },
				{ name: 'C#', icon: 'csharp-original.svg' },
				{ name: 'Java', icon: 'java-original-wordmark-removebg-preview.png' },
				{ name: 'JavaScript', icon: 'js.png' },
				{ name: 'TypeScript', icon: 'Typescript_logo_2020.svg.png' },
				{ name: 'Bash', icon: 'bash.png' },
				{ name: 'Markdown', icon: 'markdown.svg' },
				{ name: 'HTML', icon: 'white_bg_HTML5_logo_and_wordmark.svg.png' },
				{ name: 'CSS', icon: 'css.png' },
				{ name: 'LaTeX', icon: 'white_bg_latex-original.png' }
			]
		},
		{
			title: 'AI/ML & Data Science',
			emoji: '🤖',
			icons: [
				{ name: 'PyTorch', icon: 'pytorch-original.svg' },
				{ name: 'TensorFlow', icon: 'tensorflow.png' },
				{ name: 'Keras', icon: 'keras-original.svg' },
				{ name: 'Scikit-learn', icon: 'white_bg_scikitlearn-original.png' },
				{ name: 'NumPy', icon: 'numpy-original.svg' },
				{ name: 'Pandas', icon: 'white_bg_pandas-original.png' },
				{ name: 'Polars', icon: 'polars.png' },
				{ name: 'Matplotlib', icon: 'matplotlib-original.svg' },
				{ name: 'Seaborn', icon: 'seaborn-1.svg' },
				{ name: 'Plotly', icon: 'plotly.png' },
				{ name: 'OpenCV', icon: 'opencv-original.svg' },
				{ name: 'spaCy', icon: 'spacy.png' },
				{ name: 'NLTK', icon: 'nltk.png' },
				{ name: 'LangChain', icon: 'langchain.jpg' },
				{ name: 'LangGraph', icon: 'langgraph-color.jpg' },
				{ name: 'LangSmith', icon: 'langsmith-color.jpg' },
				{ name: 'HuggingFace', icon: 'huggingface-2-removebg-preview.png' },
				{ name: 'Kaggle', icon: 'kaggle-original-wordmark.svg' },
				{ name: 'Ollama', icon: 'white_bg_ollamalogo.png' },
				{ name: 'Meta', icon: 'meta-6871457_1280.webp' },
				{ name: 'OpenAI', icon: 'white_bg_openai-2.png' },
				{ name: 'Model Context Protocol', icon: 'mcp.jpg' },
				{ name: 'Chroma', icon: 'chroma.png' },
				{ name: 'Weaviate', icon: 'weaviate.png' }
			]
		},
		{
			title: 'Frameworks & Libraries',
			emoji: '🌐',
			icons: [
				{ name: 'React', icon: 'react.png' },
				{ name: 'Node.js', icon: 'free-node-js-icon-svg-download-png-1174935.webp' },
				{ name: 'FastAPI', icon: 'fastapi.svg' },
				{ name: 'Flask', icon: 'white_bg_flask-original-wordmark.png' },
				{ name: 'Quart', icon: 'quart.png' },
				{ name: 'Uvicorn', icon: 'white_bg_uvicorn.png' },
				{ name: 'Streamlit', icon: 'streamlit-mark-color.svg' },
				{ name: 'Gradio', icon: 'gradio-color.png' },
				{ name: 'Requests', icon: 'Requests_Python_Logo.png' },
				{ name: 'Selenium', icon: 'selenium-original.svg' },
				{ name: 'Pytest', icon: 'pytest.png' }
			]
		},
		{
			title: 'Databases',
			emoji: '🗃️',
			icons: [
				{ name: 'MySQL', icon: 'mysql-original-wordmark-removebg-preview.png' },
				{ name: 'PostgreSQL', icon: 'Postgresql_elephant.svg.png' },
				{ name: 'SQLite', icon: 'white_bg_sqlite-original-wordmark.png' },
				{ name: 'Neo4j', icon: 'white_bg_neo4j-icon-452x512-b63ajo4a.png' },
				{ name: 'PHPMyAdmin', icon: 'white_bg_phpmyadmin-thumb.png' },
				{ name: 'SQLAlchemy', icon: 'white_bg_sqlalchemy-original-wordmark.png' }
			]
		},
		{
			title: 'DevOps & Tools',
			emoji: '🛠️',
			icons: [
				{ name: 'Git', icon: 'white_bg_git-original-wordmark.png' },
				{ name: 'GitHub', icon: 'github-original-wordmark-removebg-preview.png' },
				{ name: 'GitHub Actions', icon: 'github-actions.png' },
				{ name: 'Docker', icon: 'docker-original.svg' },
				{ name: 'VirtualBox', icon: 'virtualbox.png' },
				{ name: 'AWS', icon: 'aws.webp' },
				{ name: 'Anaconda', icon: 'white_bg_anaconda-original.png' },
				{ name: 'Poetry', icon: 'poetry.png' },
				{ name: 'uv', icon: 'uv.svg' },
				{ name: 'npm', icon: 'npm.webp' },
				{ name: 'Bun', icon: 'bun.png' }
			]
		},
		{
			title: 'IDEs & Editors',
			emoji: '🖥️',
			icons: [
				{ name: 'VSCode', icon: 'vscode-original.svg' },
				{ name: 'Visual Studio', icon: 'visualstudio-original.svg' },
				{ name: 'Jupyter', icon: 'jupyter-original-wordmark-removebg-preview.png' },
				{ name: 'Google Colab', icon: 'google-colab-icon.webp' },
				{ name: 'Unity', icon: 'white_bg_unity-original.png' },
				{ name: 'Blender', icon: 'blender-original-removebg-preview.png' }
			]
		},
		{
			title: 'Operating Systems & Security',
			emoji: '💻',
			icons: [
				{ name: 'Windows', icon: 'white_bg_windows11-original.png' },
				{ name: 'Linux', icon: 'linux-original.svg' },
				{ name: 'Debian', icon: 'white_bg_Debian_logo.png' },
				{ name: 'Ubuntu', icon: 'ubuntu-original.svg' },
				{ name: 'Kali Linux', icon: 'white_bg_kalilinux-original-wordmark.png' },
				{ name: 'Wireshark', icon: 'Wireshark_icon_new.png' }
			]
		}
	];

	// Shooting stars
	function createShootingStars() {
		if (!skillsSection) return;

		setInterval(() => {
			const numberOfStars = Math.floor(Math.random() * 3) + 1;

			for (let i = 0; i < numberOfStars; i++) {
				if (Math.random() > 0.3) {
					setTimeout(() => {
						const star = document.createElement('div');
						star.className = 'shooting-star';
						star.style.cssText = `
							position: absolute;
							top: ${Math.random() * 60}%;
							left: ${Math.random() * 100}%;
							width: 2px;
							height: 2px;
							background: white;
							border-radius: 50%;
							box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
							animation: shootingStar ${0.8 + Math.random() * 1.5}s linear forwards;
							pointer-events: none;
							z-index: 1;
						`;
						skillsSection.appendChild(star);

						setTimeout(() => {
							if (star.parentNode) {
								star.parentNode.removeChild(star);
							}
						}, 2500);
					}, i * 200);
				}
			}
		}, 600);
	}

	// Constellations
	function createConstellations() {
		if (!skillsSection) return;

		const constellationContainer = document.createElement('div');
		constellationContainer.className = 'constellation-container';
		constellationContainer.style.cssText = `
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			pointer-events: none;
			z-index: 1;
		`;
		skillsSection.appendChild(constellationContainer);

		const constellations = [
			{ stars: 5, x: 15, y: 15 },
			{ stars: 4, x: 35, y: 20 },
			{ stars: 6, x: 55, y: 18 },
			{ stars: 5, x: 75, y: 22 },
			{ stars: 4, x: 90, y: 25 },
			{ stars: 5, x: 10, y: 45 },
			{ stars: 6, x: 30, y: 50 },
			{ stars: 4, x: 50, y: 48 },
			{ stars: 5, x: 70, y: 52 },
			{ stars: 6, x: 88, y: 55 },
			{ stars: 4, x: 20, y: 75 },
			{ stars: 5, x: 42, y: 78 },
			{ stars: 6, x: 62, y: 72 },
			{ stars: 4, x: 80, y: 80 },
			{ stars: 3, x: 95, y: 85 }
		];

		constellations.forEach((constellation) => {
			const constGroup = document.createElement('div');
			constGroup.style.cssText = `
				position: absolute;
				left: ${constellation.x}%;
				top: ${constellation.y}%;
			`;

			const starPositions: { x: number; y: number }[] = [];

			for (let i = 0; i < constellation.stars; i++) {
				const starX = Math.random() * 100;
				const starY = Math.random() * 100;
				starPositions.push({ x: starX, y: starY });

				const star = document.createElement('div');
				star.className = 'constellation-star';
				star.style.cssText = `
					position: absolute;
					left: ${starX}px;
					top: ${starY}px;
					width: ${2 + Math.random() * 2}px;
					height: ${2 + Math.random() * 2}px;
					background: rgba(255, 255, 255, 0.9);
					border-radius: 50%;
					box-shadow: 0 0 8px 2px rgba(100, 200, 255, 0.6);
					animation: constellationTwinkle 3s ease-in-out infinite;
					animation-delay: ${Math.random() * 2}s;
				`;
				constGroup.appendChild(star);
			}

			// Lines connecting stars
			for (let i = 0; i < starPositions.length - 1; i++) {
				const from = starPositions[i];
				const to = starPositions[i + 1];
				const dx = to.x - from.x;
				const dy = to.y - from.y;
				const length = Math.sqrt(dx * dx + dy * dy);
				const angle = Math.atan2(dy, dx) * (180 / Math.PI);

				const line = document.createElement('div');
				line.className = 'constellation-line';
				line.style.cssText = `
					position: absolute;
					left: ${from.x}px;
					top: ${from.y}px;
					width: ${length}px;
					height: 1px;
					background: linear-gradient(90deg, rgba(100, 200, 255, 0.3), rgba(100, 200, 255, 0.5), rgba(100, 200, 255, 0.3));
					transform: rotate(${angle}deg);
					transform-origin: left center;
					animation: constellationLinePulse 3s ease-in-out infinite;
					animation-delay: ${Math.random() * 2}s;
				`;
				constGroup.appendChild(line);
			}

			constellationContainer.appendChild(constGroup);
		});
	}

	// Rainbow effect on random icons
	let rainbowIcons: HTMLElement[] = [];

	function addRandomRainbowEffect() {
		const icons = Array.from(document.querySelectorAll('.tech-icon')) as HTMLElement[];

		icons.forEach((icon) => {
			const rainbowLayer = document.createElement('div');
			rainbowLayer.className = 'rainbow-layer';
			icon.appendChild(rainbowLayer);
		});

		rainbowIcons = icons;
		const numberOfRainbowIcons = Math.floor(icons.length * 0.15);

		function shuffleArray<T>(array: T[]): T[] {
			const shuffled = [...array];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled;
		}

		function activateRandomIcons() {
			const shuffled = shuffleArray(rainbowIcons);
			const selectedIcons = shuffled.slice(0, numberOfRainbowIcons);

			selectedIcons.forEach((icon, index) => {
				const randomDelay = Math.random() * 5000 + index * 400;
				setTimeout(() => {
					icon.classList.add('rainbow-glow');
				}, randomDelay);
			});
		}

		function deactivateAllIcons() {
			rainbowIcons.forEach((icon, index) => {
				const randomDelay = Math.random() * 4000 + index * 150;
				setTimeout(() => {
					icon.classList.remove('rainbow-glow');
				}, randomDelay);
			});
		}

		activateRandomIcons();

		let cycleCount = 0;
		setInterval(() => {
			if (cycleCount % 2 === 0) {
				deactivateAllIcons();
			} else {
				setTimeout(() => activateRandomIcons(), 3000);
			}
			cycleCount++;
		}, 12000);
	}

	// Parallax hover effect with random animation
	function addParallaxEffect() {
		const icons = document.querySelectorAll('.tech-icon') as NodeListOf<HTMLElement>;

		icons.forEach((icon) => {
			// Add random animation delay and duration for async floating
			const randomDelay = Math.random() * 5;
			const randomDuration = 3 + Math.random() * 2;
			icon.style.animationDelay = `${randomDelay}s`;
			icon.style.animationDuration = `${randomDuration}s`;
			
			let isHovering = false;

			icon.addEventListener('mouseenter', () => {
				isHovering = true;
			});

			icon.addEventListener('mouseleave', () => {
				isHovering = false;
				icon.style.transform = '';
			});

			icon.addEventListener('mousemove', (e) => {
				if (isHovering) {
					const rect = icon.getBoundingClientRect();
					const x = e.clientX - rect.left - rect.width / 2;
					const y = e.clientY - rect.top - rect.height / 2;
					const moveX = (x / rect.width) * 10;
					const moveY = (y / rect.height) * 10;
					icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
				}
			});
		});
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						createShootingStars();
						createConstellations();
						setTimeout(() => {
							addRandomRainbowEffect();
							addParallaxEffect();
						}, 500);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (skillsSection) {
			observer.observe(skillsSection);
		}

		return () => {
			if (skillsSection) {
				observer.unobserve(skillsSection);
			}
		};
	});
</script>

<section id="skills" class="skills" bind:this={skillsSection}>
	<div class="container">
		<h2 class="section-title">💻 Tech Stack</h2>

		{#each skillCategories as category}
			<div class="skills-category">
				<h3>{category.emoji} {category.title}</h3>
				<div class="skills-grid">
					{#each category.icons as icon}
						<div class="tech-icon" data-title={icon.name}>
							<img src="/assets/icons/{icon.icon}" alt={icon.name} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	:global(.shooting-star::after) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 80px;
		height: 1px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
		transform: translateX(-80px) translateY(0px) rotate(45deg);
	}

	:global {
		@keyframes shootingStar {
			0% {
				transform: translate(0, 0) scale(1);
				opacity: 1;
			}
			70% {
				opacity: 1;
			}
			100% {
				transform: translate(300px, 300px) scale(0);
				opacity: 0;
			}
		}

		@keyframes constellationTwinkle {
			0%,
			100% {
				opacity: 0.6;
				transform: scale(1);
			}
			50% {
				opacity: 1;
				transform: scale(1.3);
			}
		}

		@keyframes constellationLinePulse {
			0%,
			100% {
				opacity: 0.3;
			}
			50% {
				opacity: 0.6;
			}
		}
	}
</style>
