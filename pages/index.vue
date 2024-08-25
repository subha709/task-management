<template>
    <router-link class="w-full sm:w-auto rounded-md bg-[#8bc63e] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#8bc63e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-[180px]" to="/add-task">Go to Add Task Page</router-link>
    <!-- <clickCounter></clickCounter>
    <MouseHover></MouseHover> -->
</template>

<script>
import { defineComponent } from '@vue/composition-api'
//import clickCounter from '~/components/clickCounter.vue'

export default defineComponent({
 // components: { clickCounter },
    setup() {
        
    },
})
</script>
