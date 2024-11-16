<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from "mode-watcher";
	
</script>
<ModeWatcher/>
<Header/>
<slot></slot>
