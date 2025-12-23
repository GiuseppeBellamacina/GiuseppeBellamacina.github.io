<script lang="ts">
	import { onMount } from 'svelte';

	let projectsSection: HTMLElement;
	let isVisible = false;

	interface Project {
		icon: string;
		title: string;
		description: string;
		techTags: string[];
		githubUrl: string;
		isHackathonWinner?: boolean;
		externalLink?: {
			url: string;
			type: 'demo' | 'download' | 'youtube' | 'hackathon';
			icon: string;
		};
		stars?: number;
		starsLoaded?: boolean;
	}

	let projects: Project[] = [
		{
			icon: '🤖',
			title: 'Guardian',
			description: 'AI assistant for Law Enforcement.',
			techTags: ['Neo4j', 'LangGraph', 'LLM'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Guardian',
			isHackathonWinner: true,
			externalLink: {
				url: 'https://devpost.com/software/guardian-p2g0df',
				type: 'hackathon',
				icon: 'fas fa-trophy'
			}
		},
		{
			icon: '📸',
			title: 'Image Enhancement',
			description:
				'Deep Learning models for image restoration and enhancement with multiple degradation types.',
			techTags: ['PyTorch', 'UNet', 'GAN', 'Computer Vision'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Image-Enhancement'
		},
		{
			icon: '🖼️',
			title: 'Steganography WebApp',
			description: 'Hide data inside images with this web application.',
			techTags: ['Steganography', 'Streamlit'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Steganography-WebApp',
			externalLink: {
				url: 'https://steg-app.streamlit.app',
				type: 'demo',
				icon: 'fas fa-external-link-alt'
			}
		},
		{
			icon: '🧠',
			title: 'Neural Sudoku',
			description: 'Deep Learning model that solves Sudoku puzzles.',
			techTags: ['PyTorch', 'Deep Learning', 'Sudoku'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Neural-Sudoku'
		},
		{
			icon: '🎮',
			title: 'The Legend of Turi',
			description: 'Zelda-like game with Sicilian twist.',
			techTags: ['C#', 'Unity'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/The-Legend-of-Turi',
			externalLink: {
				url: 'https://github.com/GiuseppeBellamacina/The-Legend-of-Turi/releases/download/game/Turi.zip',
				type: 'download',
				icon: 'fas fa-download'
			}
		},
		{
			icon: '🔍',
			title: 'Kagi ML Dev Challenge',
			description: 'AI-powered Hacker News article analyzer and search system.',
			techTags: ['LangChain', 'Weaviate', 'HuggingFace'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Kagi-ML-dev-challenge',
			externalLink: {
				url: 'https://www.youtube.com/watch?v=ubm9zkNf8jM',
				type: 'youtube',
				icon: 'fab fa-youtube'
			}
		},
		{
			icon: '📊',
			title: 'Sales Store Forecasting',
			description: 'Time series forecasting for sales data.',
			techTags: ['Python', 'Machine Learning'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Sales-Store-Time-Series-Forecasting'
		},
		{
			icon: '👤',
			title: 'Celebrity ResNet18',
			description: 'Face Recognition with CNN.',
			techTags: ['PyTorch', 'ResNet', 'Face Recognition'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Celebrity-ResNet18'
		},
		{
			icon: '🤖',
			title: 'OmniBot V2',
			description: 'Updated chatbot with Smart RAG Chain.',
			techTags: ['RAG', 'LangChain', 'LangGraph'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/OmniBot-V2'
		},
		{
			icon: '🧪',
			title: 'Little Language Model',
			description: "Transformer trained on Dante's works.",
			techTags: ['PyTorch', 'Transformers', 'LLM'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/Little_Language_Model'
		},
		{
			icon: '🔒',
			title: 'VulnerabilityBot',
			description: 'Cybersecurity tool with LLM.',
			techTags: ['Cybersecurity', 'LLM'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/VulnerabilityBot'
		},
		{
			icon: '📚',
			title: 'EPUB Translator',
			description: 'Translate EPUB files with LLMs.',
			techTags: ['EPUB', 'LLM', 'Translation'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/EPUB-Translator'
		},
		{
			icon: '🧹',
			title: 'SpazzApp',
			description: 'Web app to manage cleaning tasks between roommates.',
			techTags: ['Heuristics', 'Streamlit'],
			githubUrl: 'https://github.com/GiuseppeBellamacina/SpazzApp',
			externalLink: {
				url: 'https://spazzapp.streamlit.app',
				type: 'demo',
				icon: 'fas fa-external-link-alt'
			}
		}
	];

	// Fetch GitHub stars
	async function fetchGitHubStars() {
		// Crea un array di promise per fetch paralleli
		const fetchPromises = projects.map(async (project, index) => {
			try {
				// Controllo cache (1 ora di validità)
				const cacheKey = `github_stars_${project.githubUrl}`;
				const cached = localStorage.getItem(cacheKey);
				if (cached) {
					const { stars, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < 3600000) {
						// 1 ora
						project.stars = stars;
						project.starsLoaded = true;
						projects = [...projects];
						return;
					}
				}

				const match = project.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
				if (match) {
					const [, owner, repo] = match;
					const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
					if (response.ok) {
						const data = await response.json();
						project.stars = data.stargazers_count;
						project.starsLoaded = true;

						// Salva in cache
						localStorage.setItem(
							cacheKey,
							JSON.stringify({
								stars: data.stargazers_count,
								timestamp: Date.now()
							})
						);

						projects = [...projects]; // Trigger reactivity progressivo
					}
				}
			} catch (error) {
				console.error(`Failed to fetch stars for ${project.title}:`, error);
			}
		});

		// Esegui tutte le richieste in parallelo
		await Promise.all(fetchPromises);
	}

	// Fade-in animation for project cards
	function setupProjectCardAnimations() {
		const cards = projectsSection?.querySelectorAll('.project-card');
		if (!cards) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
		);

		cards.forEach((card) => {
			observer.observe(card);
		});
	}

	onMount(() => {
		// IntersectionObserver for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						fetchGitHubStars();
						setupProjectCardAnimations();
					}
				});
			},
			{ threshold: 0.05, rootMargin: '100px' }
		);

		if (projectsSection) {
			observer.observe(projectsSection);
		}

		return () => {
			if (projectsSection) {
				observer.unobserve(projectsSection);
			}
		};
	});
</script>

<section id="projects" class="projects" bind:this={projectsSection}>
	<div class="container">
		<h2 class="section-title">🚀 Personal Projects</h2>
		<div class="projects-grid">
			{#each projects as project}
				<div class="project-card">
					{#if project.externalLink}
						<a
							href={project.externalLink.url}
							target="_blank"
							class="download-btn"
							title={project.externalLink.type === 'download'
								? 'Download'
								: project.externalLink.type === 'demo'
									? 'View Demo'
									: project.externalLink.type === 'youtube'
										? 'Watch Demo'
										: 'View Hackathon'}
							download={project.externalLink.type === 'download' ? true : undefined}
						>
							<i class={project.externalLink.icon}></i>
						</a>
					{/if}
					<div class="project-icon">{project.icon}</div>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
					<div class="project-tech">
						{#if project.isHackathonWinner}
							<span class="hackathon-badge">🏆 Hackathon Winner</span>
						{/if}
						{#each project.techTags as tag}
							<span class="tech-tag">{tag}</span>
						{/each}
					</div>
					<div class="project-footer" class:has-stars={project.starsLoaded}>
						{#if project.starsLoaded}
							<span class="stars loaded">⭐ {project.stars}</span>
						{:else}
							<span class="stars"></span>
						{/if}
						<a href={project.githubUrl} target="_blank" class="project-link">
							View Project <i class="fas fa-arrow-right"></i>
						</a>
					</div>
				</div>
			{/each}
		</div>
		<div class="view-all">
			<a
				href="https://github.com/GiuseppeBellamacina?tab=repositories"
				target="_blank"
				class="btn btn-primary"
			>
				View All Projects on GitHub
			</a>
		</div>
	</div>
</section>
