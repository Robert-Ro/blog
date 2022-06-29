<template>
  <div>
    <!-- <span>text vnode</span> -->
    <HelloWorld />
  </div>
</template>
<script>
export default {
  components: {
    HelloWorld: () => ({
      component: import("./components/HelloWorld.vue"),
      loading: null,
      error: null,
      delay: 200,
      timeout: 3000,
    }),
  },
};
</script>
