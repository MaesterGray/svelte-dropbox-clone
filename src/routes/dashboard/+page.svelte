<script lang="ts">
	import Dropzone from "$lib/components/Dropzone.svelte";
	import DataGrid from "$lib/components/DataGrid.svelte";
	import DeleteModal from "$lib/components/modals/DeleteModal.svelte";
	import RenameModal from "$lib/components/modals/RenameModal.svelte";
	import type { ActionResult } from "@sveltejs/kit";
	import type { TUser,TFiles } from "$lib/Types";
	let {data,form}:{data:{user:Promise<TUser>,files:Promise<TFiles[]>},form:ActionResult} = $props()
	
</script>

<div>
	{#await data.user then user }
	<Dropzone uid={user.uid}/>
		
	{/await}
	{#await data.files then files }
	<DataGrid files={files} count={files.length}/>
		
	{/await}
	<DeleteModal actionResult={form}/> 
	<RenameModal actionResult={form}/>
</div>