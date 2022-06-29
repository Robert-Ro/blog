<template>
  <div id="app">
    <aside class="aside">
      <router-link to="/chart">chart</router-link>
      <router-link to="/slot">slot</router-link>
      <router-link to="/babel">babel</router-link>
      <router-link to="/directive">directive</router-link>
      <router-link to="/date-fns">date-fns</router-link>
      <router-link to="/antdv">antdv</router-link>
      <router-link to="/vue-router/123">vue-router</router-link>
      <router-link to="/scoped-style">scoped style</router-link>
      <router-link to="/responsive">responsive</router-link>
      <router-link to="/tailwind">tailwind</router-link>
      <router-link to="/vnode">vnode</router-link>
    </aside>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
html,
body {
  margin: 0;
}
</style>
<style scoped lang="less">
aside,
main {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  .aside {
    width: 286px;
    height: 100vh;
    display: flex;
    padding: 10px 20px;
    flex-direction: column;
  }
  .main {
    flex: 1;
    padding: 10px;
  }
}
</style>
