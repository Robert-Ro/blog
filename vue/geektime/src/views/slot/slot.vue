<template>
  <div class="section">
    <Vnodes :vnodes="vnodeTitle" />
    <Vnodes :vnodes="vnodeDefault" />
    <Vnodes :vnodes="vnodeScopedItem({ value: 'vue' })" />
    {{ name }}
    <button @click="handleChange">change name</button>
  </div>
</template>

<script>
// 通过属性的方式接收插槽
export default {
  props: {
    vnodeTitle: Array,
    vnodeDefault: Array,
    vnodeScopedItem: { type: Function, default: () => {} },
    name: String,
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChange() {
      this.onChange("hello title");
    },
  },
};
</script>

<style lang="less" scoped>
.section {
  display: flex;
  flex-direction: column;
}
</style>
