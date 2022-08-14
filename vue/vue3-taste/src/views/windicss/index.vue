<template>
  <div class="bg-cyan-300">
    <span class="text-lg">
      {{ msg }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const msg = ref(1);
</script>
