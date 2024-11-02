<script setup lang="ts">
import { onMounted, ref } from "vue";

import { articlePage } from "@/api";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const total = ref(0);
const modules = ref([Navigation, Pagination, Autoplay]);
const articledate: any = ref([]);

const mySwiper: any = ref(null);
const b = ref(false);
onMounted(async () => {
  const res = await articlePage(1, 5);
  total.value = res.data.total;
  articledate.value = res.data.records;
  if (mySwiper.value && mySwiper.value.swiper) {
    mySwiper.value.swiper.update();
  }
  console.log("初始化");
  b.value = true;
});
</script>

<template>
  <div>
    <swiper
      ref="mySwiper"
      loop
      navigation
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :modules="modules"
      style="height: 250px; border-radius: 10px; margin: 20px"
      v-if="b"
    >
      <swiper-slide
        v-for="item in articledate"
        :key="item.id"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div class="item_text">
          <div style="font-size: 30px">
            {{ item.title }}
          </div>
          <div style="font-size: 15px">
            {{ item.createTime }}
          </div>
        </div>
        <el-image :src="item.image" />
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.item_text {
  position: absolute;
  width: 100%;
  height: 100%;
  // 文字上下居中
  @include center;
  /*  @include center; */
  flex-direction: column;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  z-index: 1;
  line-height: 40px;
}

// 图片
el-image {
  width: 100%;
  @media screen and (min-width: 768px) {
    transform: translate(0, -20%);
  }
}
</style>
