<script lang='ts'>

    import { Toast } from '$lib/stores/toastStore';
    import { CircleX, CircleCheck  } from 'lucide-svelte';
    
  </script>

  <div
    class=" toast fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 max-w-xs w-full bg-gray-800  text-white rounded-md shadow-lg transition-opacity duration-300 flex flex-col space-y-3"
    style:opacity={$Toast ? 1 : 0}
    style:visibility={$Toast ? 'visible' : 'hidden'}
  >
  {#if $Toast?.dismissible}
  <button class=" self-end">x</button>
    
  {/if}
  <span class=" flex items-center space-x-2">
    {#if $Toast?.type==='failure'}
    <CircleX class=' text-red-600'/>
    {:else}
    <CircleCheck  class=' text-green-600'/>
    {/if}

    <div>{$Toast?.message}</div>

  </span>
    
    
  </div>