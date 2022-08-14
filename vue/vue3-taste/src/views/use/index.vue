<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { OnLongPress } from "@vueuse/components";
const el = ref();

function close(e: any) {
  /* ... */
  console.log(e);
}

onClickOutside(el, close);

const longPressedComponent = ref(false);

const onLongPressCallbackComponent = (e: PointerEvent) => {
  longPressedComponent.value = true;
};
const resetComponent = () => {
  longPressedComponent.value = false;
};
</script>

<template>
  <div ref="el">Click Outside of Me</div>

  <p>Long Pressed: {{ longPressedComponent }}</p>

  <OnLongPress
    as="button"
    class="ml-2 button small"
    @trigger="onLongPressCallbackComponent"
  >
    Press long
  </OnLongPress>

  <button class="ml-2 button small" @click="resetComponent">Reset</button>
</template>
