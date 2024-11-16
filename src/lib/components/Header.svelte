<script>
import Logo from './Logo.svelte'
import * as Avatar from '$lib/components/ui/avatar'
import {Button} from '$lib/components/ui/button'
import ToggleMode from './ToggleMode.svelte';
import { page } from '$app/stores';
import { signOut } from 'firebase/auth';
import { goto } from '$app/navigation';
import { auth } from '$lib/firebaseConfig';

async function logOut() {
		await fetch('/', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	}
    
</script>

<header class=" flex items-center justify-between bg-background sticky top-0 left-0 text-white">
    <Logo/>
    <div class="flex gap-5 items-center">
        <ToggleMode/>
        {#await $page.data.user then user}
        <Avatar.Root>
            <Avatar.Image
                src={`${user.profilePic}`}
                alt={`${user.name}'s profile picture`}
            />
        </Avatar.Root>
        {/await}
        
        <Button onclick={logOut} variant="ghost" class="">Sign out</Button>
    </div>
   
</header>
