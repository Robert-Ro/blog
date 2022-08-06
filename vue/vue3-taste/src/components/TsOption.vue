<template>
    <button @click="test">test</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: {
        addBook(payload: { bookName: string }) {
            return payload.bookName.length > 1
        },
    },
    methods: {
        test(e: Event) {
            // this.$emit('addBook', 2)
            // this.$emit('addBook', { bookName: 3 })
            this.$emit('addBook', {
                bookName: '222',
            })
            this.$http.get({})
            this.$translate('a')
        },
    },
    setup(props, { emit, expose }) {
        emit('addBook', { bookName: 'test name' })
    },
})
</script>
