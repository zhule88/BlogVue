<script setup lang="ts">
import inmage from "@/views/Main/Home/image.vue";
import brand from "@/views/Main/Home/up/brand.vue";
import wave from "@/views/Main/Home/up/wave.vue";
import sidebar from "@/views/Main/Home/down/sidebar.vue";
import mmain from "@/views/Main/Home/down/main.vue";
</script>
<template>
  <inmage></inmage>
  <div class="up">
    <brand></brand>
    <wave></wave>
  </div>
  <div class="down">
    <div style="width: 80%; display: flex">
      <mmain class="mmain"></mmain>
      <sidebar class="sidebar" style=""></sidebar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.up {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
  color: var(--header-text-color);
}
.down {
  // 过渡效果
  margin: 0;
  //border: red 1px solid;
  display: flex;
  position: relative;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: var(--mao-background-color);
  width: 100%;
}
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
