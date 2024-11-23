<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from "mode-watcher";
	import ToastContainer from '$lib/components/modals/ToastContainer.svelte';
</script>
<ModeWatcher/>
<Header/>
<ToastContainer/>
<slot></slot>
