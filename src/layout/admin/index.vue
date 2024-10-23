<script setup lang="ts">
import Header from "@/layout/admin/Header.vue";
</script>
<template>
  <Header></Header>
  <RouterView />
</template>

<style lang="scss" scoped>
.mmain {
  width: 80%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
.sidebar {
  width: 20%;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
</style>
