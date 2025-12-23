<script lang="ts" module>
	export const debugModeStore = $state({ active: false });
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import SnowEffect from './SnowEffect.svelte';
	import HalloweenEffect from './HalloweenEffect.svelte';
	import SummerEffect from './SummerEffect.svelte';
	import NewYearEffect from './NewYearEffect.svelte';

	let selectedEffect = $state<string>('none');
	let isDebugMode = $state(false);

	$effect(() => {
		debugModeStore.active = isDebugMode;
	});

	const effects = [
		{ id: 'none', name: '❌ Nessuno', component: null },
		{ id: 'snow', name: '❄️ Neve (Natale)', component: SnowEffect },
		{ id: 'halloween', name: '🎃 Halloween', component: HalloweenEffect },
		{ id: 'summer', name: '✨ Estate (Lucciole)', component: SummerEffect },
		{ id: 'newyear', name: '🎆 Capodanno', component: NewYearEffect }
	];

	onMount(() => {
		// Controlla se siamo in modalità debug tramite URL parameter
		const params = new URLSearchParams(window.location.search);
		isDebugMode = params.has('seasonal-debug');
	});

	function toggleDebugMode() {
		isDebugMode = !isDebugMode;
		if (!isDebugMode) {
			selectedEffect = 'none';
		}
	}
</script>

<!-- Pulsante per attivare/disattivare la modalità debug -->
<button class="debug-toggle" onclick={toggleDebugMode} title="Test Seasonal Effects">
	{isDebugMode ? '🎨 Debug ON' : '🎨'}
</button>

<!-- Pannello di controllo -->
{#if isDebugMode}
	<div class="debug-panel">
		<h3>🎨 Seasonal Effects Tester</h3>
		<p class="debug-hint">Seleziona un effetto da testare:</p>
		<div class="effects-grid">
			{#each effects as effect}
				<button
					class="effect-button"
					class:active={selectedEffect === effect.id}
					onclick={() => (selectedEffect = effect.id)}
				>
					{effect.name}
				</button>
			{/each}
		</div>
		<p class="debug-info">
			💡 Tip: Aggiungi <code>?seasonal-debug</code> all'URL per aprire automaticamente questo pannello
		</p>
	</div>
{/if}

<!-- Rendering degli effetti -->
{#if isDebugMode}
	{#if selectedEffect === 'snow'}
		<SnowEffect forceShow={true} />
	{:else if selectedEffect === 'halloween'}
		<HalloweenEffect forceShow={true} />
	{:else if selectedEffect === 'summer'}
		<SummerEffect forceShow={true} />
	{:else if selectedEffect === 'newyear'}
		<NewYearEffect forceShow={true} />
	{/if}
{/if}

<style>
	.debug-toggle {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		z-index: 10002;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.debug-toggle:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
	}

	.debug-panel {
		position: fixed;
		bottom: 90px;
		right: 20px;
		background: rgba(20, 20, 30, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		padding: 20px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
		z-index: 10002;
		min-width: 300px;
		max-width: 400px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		animation: slideIn 0.3s ease;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.debug-panel h3 {
		margin: 0 0 15px 0;
		color: #fff;
		font-size: 1.2rem;
		text-align: center;
	}

	.debug-hint {
		color: #aaa;
		font-size: 0.9rem;
		margin-bottom: 10px;
	}

	.effects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 8px;
		margin-bottom: 15px;
	}

	.effect-button {
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #fff;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.95rem;
		text-align: left;
	}

	.effect-button:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateX(5px);
	}

	.effect-button.active {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-color: #667eea;
		font-weight: 600;
	}

	.debug-info {
		font-size: 0.75rem;
		color: #888;
		margin: 10px 0 0 0;
		padding-top: 10px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.debug-info code {
		background: rgba(255, 255, 255, 0.1);
		padding: 2px 6px;
		border-radius: 3px;
		font-family: monospace;
		color: #4ecdc4;
	}

	@media (max-width: 768px) {
		.debug-toggle {
			bottom: 15px;
			right: 15px;
			width: 45px;
			height: 45px;
			font-size: 1rem;
		}

		.debug-panel {
			bottom: 75px;
			right: 15px;
			left: 15px;
			max-width: none;
		}
	}
</style>
