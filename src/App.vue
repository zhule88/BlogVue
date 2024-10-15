<script setup lang="ts">
/* import { loadOml2d } from "oh-my-live2d"; */
import Header from "@v/Header.vue";
import Main from "@/views/Main/Main.vue";
import Footer from "@v/Footer.vue";

/* loadOml2d({
  dockedPosition: "left",
  initialStatus: "sleep",
  menus: {
    disable: true,
    items: [],
  },
}); */
</script>
<template>
  <!-- <el-container> -->
  <Header></Header>
  <Main></Main>
  <Footer></Footer>
  <!-- <el-footer style="width: 100%; bottom: 0; text-align: center">
      Footer
    </el-footer> -->
  <!--  </el-container> -->
</template>

<style scoped></style>
