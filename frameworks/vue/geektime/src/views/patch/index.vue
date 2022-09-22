<template>
  <div>
    <ul class="items">
      <li
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
    <p>
      <a-button @click="shuffle">shuffle</a-button>
      <a-button @click="reset">reset</a-button>
    </p>
  </div>
</template>
<script>
export default {
  name: 'PatchConponent',
  data() {
    return {
      items: Array.from({ length: 5 }, (_, i) => i + 1),
    }
  },
  methods: {
    shuffle() {
      const index = Math.floor(Math.random() * this.items.length)
      this.items.splice(index, 1)
    },
    reset() {
      this.items = Array.from({ length: 5 }, (_, i) => i + 1)
    },
  },
}
</script>
<style>
button {
  margin-right: 5px;
}
</style>
