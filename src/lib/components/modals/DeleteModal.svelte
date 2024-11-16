<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { idStore } from '$lib/stores/idStore';
	import { deleteModalStore } from '$lib/stores/modalStore';
	import { Loader2 } from 'lucide-svelte';
	let loading = $state(false);
    import type { Action,ActionResult,ActionFailure} from '@sveltejs/kit';

type SuccessData = { deleteFileSuccess: string };
type FailureData = { deleteFileError: string };
    let {actionResult}:{actionResult:ActionResult<{}>} =$props()
    $effect(()=>{
        if (actionResult?.type==='failure') {
                alert('Delete operation failed')
                deleteModalStore.setFalse()
        }else if(actionResult?.type==='success'){
            alert('Delete operation success')
            deleteModalStore.setFalse()

        }
    })

</script>

<Dialog.Root open={$deleteModalStore} onOpenChange={deleteModalStore.setFalse}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title class="text-center capitalize text-lg"
				>are you sure you want to delete this file?</Dialog.Title
			>
		</Dialog.Header>
		<form
			method="POST"
			use:enhance={() => {
				loading = true;

				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			action="/dashboard?/deleteFile"
		>
			<input type="text" name="id" hidden value={$idStore} />
			<div class="grid grid-cols-2 items-center gap-5">
				<Button on:click={deleteModalStore.setFalse} variant="outline">cancel</Button>
				<Button type="submit" variant="destructive">
					{#if loading}
						<Loader2 class="animate-spin" />
					{:else}
						delete
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>