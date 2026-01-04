<script lang="ts">
	import '../app.css';
	import '../lib/performance.css';
	import SnowEffect from '$lib/components/seasonal/SnowEffect.svelte';
	import HalloweenEffect from '$lib/components/seasonal/HalloweenEffect.svelte';
	import SummerEffect from '$lib/components/seasonal/SummerEffect.svelte';
	import NewYearEffect from '$lib/components/seasonal/NewYearEffect.svelte';

	let { children } = $props();
</script>

<!-- Effetti stagionali automatici -->
<SnowEffect />
<NewYearEffect />
<SummerEffect />
<HalloweenEffect />

{@render children()}
