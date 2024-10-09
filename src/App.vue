<script setup lang="ts">
import { loadOml2d } from "oh-my-live2d";
import Header from "@v/Header.vue";
import Main from "@v/Main/Main.vue";
loadOml2d({
  dockedPosition: "right",
  initialStatus: "sleep",
  menus: {
    disable: true,
    items: [],
  },
});
</script>

<template>
  <el-container style="min-height: 100vh">
    <Header></Header>
    <Main></Main>
    <el-footer
      style="position: absolute; width: 100%; bottom: 0; text-align: center"
      >Footer</el-footer
    >
  </el-container>
</template>

<style scoped></style>
