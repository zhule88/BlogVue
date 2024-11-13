<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useArticleList, useCategoryList } from "@/stores";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import card from "@/components/card.vue";

const categoryListS = useCategoryList();
const articlelistS = useArticleList();
const articlelistswiperS = useArticleList();
const modules = ref([Navigation, Pagination, Autoplay]);

const isSwiper = ref(false);
onMounted(async () => {
  categoryListS.mapGet();
  await articlelistS.page();
  articlelistswiperS.top = 1;
  articlelistswiperS.get();
  isSwiper.value = true;
});
const handleCurrentChange = () => {
  articlelistS.page();
};
</script>

<template>
  <div>
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
        v-for="item in articlelistswiperS.data"
        :key="item.id"
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
    <card
      v-for="(article, index) in articlelistS.data"
      :class="[(index & 1) == 0 ? 'cardright' : 'cardleft']"
    >
      <div class="text">
        <div style="font-size: 25px">
          {{ article.title }}
        </div>
        <div style="font-size: 15px">
          <P
            >{{ categoryListS.nameGet(article.categoryId as any) }}|浏览量:{{
              article.visitCount
            }}</P
          >
        </div>
        <div style="font-size: 15px">
          <p>发布于{{ article.createTime }}|更新于{{ article.updateTime }}</p>
        </div>
      </div>
      <div style="width: 40%; height: 100%; overflow: hidden">
        <el-image :src="article.image" />
      </div>
    </card>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="articlelistS.total"
      :current-page="articlelistS.current"
      @current-change="handleCurrentChange"
      style="width: 100%"
    />
  </div>
</template>

<style scoped lang="scss">
.swiper-contain {
  height: 250px;
  border-radius: $border-radius;
  margin: 20px 0;
  width: 100%;
  .swiper-item {
    @extend center;
    width: 100%;
  }
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
.card {
  display: flex;
  height: 250px;
  .text {
    flex-direction: column;
    width: 60%;
    height: 100%;
    @extend center;
  }
  .el-image {
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    object-fit: cover;
  }
  &:hover .el-image {
    transform: scale(1.1);
  }
}
.cardleft {
  .el-image {
    border-radius: 0 $border-radius $border-radius 0;
  }
}
.cardright {
  flex-direction: row-reverse;
  .el-image {
    border-radius: $border-radius 0 0 $border-radius;
  }
}
</style>
