<script setup lang="ts">
import inmage from "@/views/user/Home/image.vue";
import brand from "@/views/user/Home/up/brand.vue";
import wave from "@/views/user/Home/up/wave.vue";
import sidebar from "@/views/user/Home/down/sidebar.vue";
import mmain from "@/views/user/Home/down/main.vue";
</script>
<template>
  <inmage></inmage>
  <div class="up">
    <brand></brand>
    <wave></wave>
  </div>
  <div class="down">
    <div style="width: 70%; display: flex">
      <mmain class="mmain"></mmain>
      <sidebar class="sidebar"></sidebar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.up {
  display: flex;
  @extend center;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
}
.down {
  // 过渡效果
  margin: 0;
  //border: red 1px solid;
  display: flex;
  position: relative;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: var(--color-background);
  width: 100%;
}
.mmain {
  width: 70%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
.sidebar {
  width: 20%;
  margin-left: auto;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
</style>
