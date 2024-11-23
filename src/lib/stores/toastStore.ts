import { writable } from 'svelte/store';
import type { ToastOptions } from '$lib/types';
const toastStore = function(toast:ToastOptions|null){
    const {set, update,subscribe} =  writable<ToastOptions|null>(toast)

    function open(toast:ToastOptions){

        set(toast)
        if(toast.timeout){
            setTimeout(() => {
                close()
            }, toast.timeout);
        }
    }

    function close(){
        update((state)=>state = null)
    }

    return{
        open,
        close,
        subscribe
    }
}

export const Toast = toastStore(null)