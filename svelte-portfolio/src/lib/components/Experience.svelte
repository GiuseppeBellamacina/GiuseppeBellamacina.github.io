<script lang="ts">
	import { onMount } from 'svelte';

	let experienceSection: HTMLElement;
	let isVisible = false;

	interface TimelineItem {
		type: 'work' | 'education';
		icon: string;
		date: string;
		title: string;
		subtitle: string;
		description: string;
		highlights: string[];
	}

	const timelineItems: TimelineItem[] = [
		{
			type: 'education',
			icon: 'fas fa-graduation-cap',
			date: '2025 - Present',
			title: "Master's Degree in Machine Learning and Artificial Intelligence",
			subtitle: 'Università degli Studi di Catania',
			description: 'Advanced studies in cutting-edge AI technologies and methodologies',
			highlights: [
				'Deep Learning and Neural Network Architectures',
				'Natural Language Processing and Computer Vision',
				'Reinforcement Learning and Multi-Agent Systems'
			]
		},
		{
			type: 'work',
			icon: 'fas fa-laptop-code',
			date: 'September 2025 - Present',
			title: 'AI Developer',
			subtitle: 'RICCA IT',
			description: 'Developing innovative AI solutions and intelligent systems',
			highlights: [
				'Design and implementation of AI-powered applications',
				'Integration of machine learning models into production systems',
				'Collaboration with cross-functional teams on AI projects'
			]
		},
		{
			type: 'work',
			icon: 'fas fa-briefcase',
			date: 'December 2024 - May 2025',
			title: 'Artificial Intelligence Engineer & Data Scientist',
			subtitle: 'Intellisync',
			description: 'AI Research and Development with focus on multi-agent systems and predictive analytics',
			highlights: [
				'Development and optimization of multi-agent architectures',
				'Analysis and research of new application fields for innovative AI technologies',
				'Design and implementation of functional prototypes to validate technical approaches',
				'Data Science & Predictive Analytics: Advanced analysis of wind turbine data',
				'Development of predictive models for energy loss estimation and failure prediction',
				'Pattern and anomaly identification using neural networks and machine learning'
			]
		},
		{
			type: 'work',
			icon: 'fas fa-code',
			date: 'June 2024 - November 2024',
			title: 'AI Research and Development',
			subtitle: 'Intellisync - Corporate Internship',
			description: 'Design and development of advanced RAG-based chatbot systems',
			highlights: [
				'Chatbot development based on Retrieval-Augmented Generation (RAG) techniques',
				'Analysis of customer needs to define system architecture',
				'Definition of functional requirements and technical specifications'
			]
		},
		{
			type: 'education',
			icon: 'fas fa-graduation-cap',
			date: '2021 - 2024',
			title: "Bachelor's Degree in Computer Science",
			subtitle: 'Università degli Studi di Catania',
			description: 'Graduated with honors, specialization in Data Elaboration and Applications',
			highlights: [
				'Graduation Grade: 110 cum Laude',
				'Focus on Artificial Intelligence, Machine Learning, and Data Science',
				'Advanced coursework in Neural Networks and Deep Learning'
			]
		},
		{
			type: 'education',
			icon: 'fas fa-school',
			date: '2016 - 2021',
			title: 'High School Diploma',
			subtitle: 'Liceo Archimede, Acireale (CT)',
			description: 'Strong foundation in mathematics and sciences',
			highlights: []
		}
	];

	function createBinaryParticles() {
		if (!experienceSection) return;

		setInterval(() => {
			// 85% spawn rate
			if (Math.random() > 0.15) {
				const particle = document.createElement('div');
				particle.textContent = Math.random() > 0.5 ? '0' : '1';
				particle.style.cssText = `
					position: absolute;
					top: ${Math.random() * 100}%;
					left: ${Math.random() * 100}%;
					color: ${['#00ffff', '#ff00ff', '#00ff9d'][Math.floor(Math.random() * 3)]};
					font-size: ${10 + Math.random() * 8}px;
					opacity: ${0.3 + Math.random() * 0.5};
					pointer-events: none;
					animation: binaryFloat ${4 + Math.random() * 3}s linear forwards;
					z-index: 1;
					font-family: monospace;
				`;
				experienceSection.appendChild(particle);

				setTimeout(() => {
					if (particle.parentNode) {
						particle.parentNode.removeChild(particle);
					}
				}, 7000);
			}
		}, 50);
	}

	onMount(() => {
		// IntersectionObserver for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						createBinaryParticles();
					}
				});
			},
			{ threshold: 0.05, rootMargin: '100px' }
		);

		if (experienceSection) {
			observer.observe(experienceSection);
		}

		return () => {
			if (experienceSection) {
				observer.unobserve(experienceSection);
			}
		};
	});
</script>

<section id="experience" class="experience" bind:this={experienceSection}>
	<div class="container">
		<h2 class="section-title">🎓 Experience & Education</h2>

		<div class="cv-download">
			<a href="/assets/cv.pdf" download="Giuseppe_Bellamacina_CV.pdf" class="btn btn-primary">
				<i class="fas fa-download"></i> Download CV
			</a>
		</div>

		<div class="timeline">
			{#each timelineItems as item, index}
				<div class="timeline-item {item.type}">
					<div class="timeline-icon">
						<i class={item.icon}></i>
					</div>
					<div class="timeline-content">
						<div class="timeline-date">{item.date}</div>
						<h3>{item.title}</h3>
						<h4>{item.subtitle}</h4>
						<p>{item.description}</p>
						{#if item.highlights.length > 0}
							<ul class="timeline-highlights">
								{#each item.highlights as highlight}
									<li>{highlight}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
