<script setup lang="ts">
import iimage from "@/views/user/Home/image.vue";
import brand from "@/views/user/Home/up/brand.vue";
import wave from "@/views/user/Home/up/wave.vue";
import sidebar from "@/views/user/Home/down/sidebar/sidebar.vue";
import mmain from "@/views/user/Home/down/main/main.vue";
</script>
<template>
  <iimage></iimage>
  <div class="up">
    <brand></brand>
    <wave></wave>
  </div>
  <dualL>
    <template #main>
      <mmain></mmain>
    </template>
    <template #sidebar>
      <sidebar></sidebar>
    </template>
  </dualL>
</template>

<style scoped lang="scss">
.up {
  @extend center;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
}
</style>
