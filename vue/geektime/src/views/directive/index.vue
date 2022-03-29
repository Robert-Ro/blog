<template>
  <div>
    <test v-custom-directive :msg="msg" v-if="visible"></test>
    <button @click="change">change</button>
    <button @click="destroy">destroy</button>
  </div>
</template>
<script>
import Test from "./component.vue";

export default {
  components: { Test },
  data() {
    return {
      msg: "init",
      visible: true,
    };
  },
  methods: {
    change() {
      this.msg = `${Math.floor(Math.random()) * 1000}`;
    },
    destroy() {
      this.visible = false;
    },
  },
};
</script>
