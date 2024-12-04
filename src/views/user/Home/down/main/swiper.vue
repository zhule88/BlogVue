<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const articleListS = new ArticleList();
const modules = ref([Navigation, Pagination, Autoplay]);
const router = useRouter();
const isSwiper = ref(false);
onMounted(async () => {
  articleListS.top.value = 1;
  await articleListS.init();
  isSwiper.value = true;
});
</script>

<template>
  <swiper
    loop
    navigation
    class="swiper-contain"
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 2500, disableOnInteraction: false }"
    :modules="modules"
    v-if="isSwiper"
  >
    <swiper-slide
      v-for="item in articleListS.list.value"
      :key="item.id"
      @click="router.push(`/user/article/${item.id}`)"
      class="swiper-item"
    >
      <div class="item_text">
        <div style="font-size: 30px">
          {{ item.title }}
        </div>
        <div style="font-size: 15px">
          <p>发布于:{{ item.createTime }}</p>
          <p>更新于:{{ item.updateTime }}</p>
        </div>
      </div>
      <el-image :src="item.image" />
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper>
</template>

<style scoped lang="scss">
.swiper-contain {
  height: 250px;
  border-radius: $border-radius;
  margin: 20px 0;
  width: 100%;
  box-shadow: $box-shadow;
  .swiper-item {
    @extend center;
    width: 100%;
  }
  .item_text {
    position: absolute;
    width: 100%;
    height: 100%;
    @extend center;
    flex-direction: column;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 0 20px;
    z-index: 1;
    line-height: 30px;
  }
}
</style>
