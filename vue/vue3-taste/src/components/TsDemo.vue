<template>
    <span>{{ msg }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return {
            msg: '1',
        }
    },
})
</script>
