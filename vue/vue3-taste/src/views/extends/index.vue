<template>
  <div>
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
    <button @click="onChange">change</button>
    <div>data: {{ JSON.stringify(data) }}</div>
    <div>error: {{ JSON.stringify(error) }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useMouse } from "./hooks/useComponent";
import { useFetch } from "./hooks/useFetch";

const { x, y } = useMouse();
const url = ref(
  `https://hacker-news.firebaseio.com/v0/item/${8865}.json?print=pretty`
);
function onChange() {
  const ids: number[] = [
    8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055,
    8865,
  ];
  const id = ids[Math.floor(Math.random() * ids.length)];
  url.value = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
}
const { data, error } = useFetch(url);
</script>
<style>
button {
  padding: 4px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>
