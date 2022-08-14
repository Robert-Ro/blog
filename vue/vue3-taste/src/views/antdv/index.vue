<template>
  <a-table :columns="columns" :dataSource="dataSource"></a-table>
</template>
<script lang="ts" setup>
import { dataSource, columns } from "./data";
</script>
