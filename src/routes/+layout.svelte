<script lang="ts">
	import '../app.css';
	import '../lib/performance.css';
	import SnowEffect from '$lib/components/SnowEffect.svelte';

	let { children } = $props();
</script>

<SnowEffect />

{@render children()}
