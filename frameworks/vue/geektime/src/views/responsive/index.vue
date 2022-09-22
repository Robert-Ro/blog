<template>
  <div>
    <span>{{ msg }}</span>
    <button @click="change">change</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'this is a message',
    }
  },
  methods: {
    change() {
      this.msg = Math.random() + ''
    },
  },
}
</script>
