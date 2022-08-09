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
