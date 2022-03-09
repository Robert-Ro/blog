<template>
  <div>option chaining</div>
</template>

<script>
export default {
 methods:{
   test(){
     const a = {info:undefined}
     console.log(a.info?.b)
     console.log(a.info??'a') // polyfilled
   }
 },
 mounted(){
   this.test()
 }
}
</script>

<style>

</style>