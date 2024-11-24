<script setup lang="ts">
/* import { loadOml2d } from "oh-my-live2d"; */
import Header from "../user/Header/Header.vue";
import Footer from "../user/Footer.vue";

/* loadOml2d({
  dockedPosition: "right",
  initialStatus: "sleep",
  menus: {
    disable: false,
    items: [],
  },
}); */
</script>
<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<style scoped></style>
