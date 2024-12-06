<script setup lang="ts">
import iimage from "@/views/user/Home/image.vue";
import brand from "@/views/user/Home/up/brand.vue";
import wave from "@/views/user/Home/up/wave.vue";
import sidebar from "@/views/user/Home/down/sidebar/sidebar.vue";
import mmain from "@/views/user/Home/down/main/main.vue";
import { throttle } from "lodash";
const el = ref<HTMLElement | null>(null);

const { y } = useWindowScroll();
const Scroll = () => {
  console.log(y);
};
const onScroll = throttle(Scroll, 300);
onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
</script>
<template>
  <iimage></iimage>
  <div class="up">
    <brand></brand>
    <!-- <wave></wave> -->
  </div>
  <Layout Two>
    <template #main>
      <mmain></mmain>
    </template>
    <template #sidebar>
      <infoCard></infoCard>
      <notice> </notice>
      <cateTag></cateTag>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
:deep(.layout) {
  background-image: none !important;
}

.up {
  @extend center;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
}
</style>
