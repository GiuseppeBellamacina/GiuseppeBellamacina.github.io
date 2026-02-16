<script lang="ts">
	import '../app.css';
	import '../lib/performance.css';
	import SnowEffect from '$lib/components/seasonal/SnowEffect.svelte';
	import SummerEffect from '$lib/components/seasonal/SummerEffect.svelte';
	import NewYearEffect from '$lib/components/seasonal/NewYearEffect.svelte';
	// import HalloweenEffect from '$lib/components/seasonal/HalloweenEffect.svelte';
	// import SakuraEffect from '$lib/components/seasonal/SakuraEffect.svelte';
	// import AutumnEffect from '$lib/components/seasonal/AutumnEffect.svelte';
	// import SeasonalEffectsDebug from '$lib/components/seasonal/SeasonalEffectsDebug.svelte';

	let { children } = $props();
</script>

<!-- Effetti stagionali automatici -->
<SnowEffect />
<NewYearEffect />
<SummerEffect />
<!-- <HalloweenEffect /> -->
<!-- <SakuraEffect /> -->
<!-- <AutumnEffect /> -->

<!-- Debug panel per testare gli effetti -->
<!-- <SeasonalEffectsDebug /> -->

{@render children()}
