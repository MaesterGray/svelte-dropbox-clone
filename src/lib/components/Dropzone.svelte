<script lang='ts'>
 import { cn } from "$lib/utils";
 import { invalidateAll } from '$app/navigation';
 import {addDoc,collection,serverTimestamp,updateDoc} from 'firebase/firestore';
 import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
 import { db, storage } from '$lib/firebaseconfig';
 let fileInput: HTMLInputElement;
 let isDragging = $state(false)
 let {uid} = $props()
 const maxSize = 10 * 1024 * 1024;
 function handleDragEnter(){
	isDragging = true
 }
 function handleClick(){
	fileInput.click()
 }
 function handleDragLeave(){
	isDragging = false
 }
 function handleDrop(e:DragEvent){
	e.preventDefault()
	isDragging = false

	if(e.dataTransfer?.files){
		const droppedFiles = Array.from(e.dataTransfer.files)
		checkFileSizeAndUpload(droppedFiles)
	}
	
 }
 function handleFileSelect(e:Event){
	if (fileInput.files){
		const selectedFiles = Array.from(fileInput.files)
		checkFileSizeAndUpload(selectedFiles)
	}
 }

 async function HandleUpload(file:File){
	const docRef = await addDoc(collection(db, 'files'), {
			uid,
			fileName: file.name,
			size: file.size,
			type: file.type,
			timestamp: serverTimestamp()
		});

		const fileRef = ref(storage, `user/${uid}/files/${docRef.id}`);
		await uploadBytes(fileRef, file);
		const downloadUrl = await getDownloadURL(fileRef);
		await updateDoc(docRef, {
			downloadUrl
		});
 }
  async function checkFileSizeAndUpload(files: File[]) {
		const allFilesValid = files.every((file) => {
			if (file.size > maxSize) {
				alert(`Error: ${file.name} file size exceeds 10MB`);
				return false;
			}

			return true;
		});

		if (allFilesValid) {
			await Promise.all(files.map(HandleUpload)) 
			try {
				alert('succeed')	
			} catch (error) {
				alert('fail')
			}
		
			 await invalidateAll();
		
		}}

	
</script>

<button
	class={cn('w-full rounded-lg bg-border/50 h-44 border-4 border-dashed', {
		'bg-primary/50 border-primary': isDragging
	})}
	ondragenter={handleDragEnter}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	onclick={handleClick}
	ondragover={(e:Event)=>{e.preventDefault()}}
>
	{#if isDragging}
		Drop the file here
	{:else}
		Drag and drop a file here or click to add files
	{/if}

	<input bind:this={fileInput} onchange={handleFileSelect} type="file" multiple hidden />
</button>
