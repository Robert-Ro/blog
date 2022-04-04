<template>
  <div>
    <div>none scoped style</div>
    <div class="example">vue scoped</div>
    <div :class="[$style.example]">vue module css</div>
  </div>
</template>
<style lang="css" scoped>
.example {
  color: red;
  font-size: 24px;
}
</style>
<style module>
.example {
  color: blueviolet;
  font-size: 28px;
}
</style>
