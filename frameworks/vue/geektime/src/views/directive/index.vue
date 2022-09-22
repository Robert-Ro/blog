<template>
  <div>
    指令的意义 - 内置指令 - template模板语法重要组成，简化复用逻辑 - 自定义指令 - 模板逻辑复用
    <test
      v-custom-directive
      v-customDirective2
      :msg="msg"
      v-if="visible"
    ></test>
    <button @click="change">change</button>
    <button @click="destroy">destroy</button>
  </div>
</template>
<script>
import Test from './component.vue'

export default {
  components: { Test },
  data() {
    return {
      msg: 'init',
      visible: true,
    }
  },
  directives: {
    customDirective2: {
      inserted() {
        console.log('customDirective2 inserted')
      },
    },
  },
  methods: {
    change() {
      this.msg = `${Math.floor(Math.random()) * 1000}`
    },
    destroy() {
      this.visible = false
    },
  },
}
</script>
