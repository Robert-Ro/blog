<template>
  <aside class="aside">
    <nav class="nav">
      <RouterLink to="/">home</RouterLink>
      <template v-for="link in links" :key="link">
        <RouterLink :to="link">{{ link.replace(/\//, "") }}</RouterLink>
      </template>
    </nav>
  </aside>
  <main class="main">
    <header>Vue3 + TS</header>
    <RouterView class="content" />
    <footer>powered by vscode</footer>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { links as _links } from "@/utils";
export default defineComponent({
  setup() {
    const links = ref<string[]>(_links);
    return {
      links,
    };
  },
  mounted() {
    this.$message.info("Antd Setup Success");
  },
});
</script>
<style scoped lang="less">
.aside {
  width: 240px;
  box-shadow: 0 0 5px #eee;
  .nav {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
}
.main {
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 20px;
  header,
  footer {
    text-align: center;
    padding: 10px 0;
  }
  .content {
    flex: 1;
  }
}
</style>
