<template>
<div>
  <local-component />
</div>
</template>
<script>
import Vue from 'vue'

Vue.component('LocalComponent', {
  name:'LocalComponent',
  template: '<div>1</div>'
})

export default {
  components: {
    // LocalComponent
  }
}
</script>