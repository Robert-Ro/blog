<template>
    <aside class="aside">
        <nav class="nav">
            <RouterLink to="/">home</RouterLink>
            <RouterLink to="/about">about</RouterLink>
            <RouterLink to="/ts">ts</RouterLink>
        </nav>
    </aside>
    <main class="main">
        <header>Vue3 + TS</header>
        <RouterView class="content" />
        <footer>powered by vscode</footer>
    </main>
</template>

<script setup lang="ts"></script>
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
    header,
    footer {
        text-align: center;
        padding: 10px 0;
    }
    .content {
        flex: 1;
        padding-left: 20px;
    }
}
</style>
