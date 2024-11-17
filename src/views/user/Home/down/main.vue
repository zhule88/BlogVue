<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
/* import category from "../down/main/category.vue"; */
import { CategoryList, Tag, ArticleList } from "@/service";
import { MessageBox } from "@element-plus/icons-vue";
import tag from "@/components/tag.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import card from "@/components/card.vue";

const articleListS = new ArticleList();

const categoryListS = new CategoryList();
const tagS = new Tag();

const articleListSwiperS = new ArticleList();
const modules = ref([Navigation, Pagination, Autoplay]);

const isSwiper = ref(false);
onMounted(async () => {
  categoryListS.init();
  tagS.init();
  articleListS.page();
  articleListSwiperS.top.value = 1;
  await articleListSwiperS.init();
  isSwiper.value = true;
});
const handleCurrentChange = (value: number) => {
  articleListS.current.value = value;
  articleListS.page();
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
        v-for="item in articleListSwiperS.list.value"
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
      v-for="(article, index) in articleListS.list.value"
      :class="[(index & 1) == 0 ? 'cardright' : 'cardleft']"
    >
      <div class="text">
        <div style="display: flex; flex-direction: column">
          <div style="font-size: 25px; margin: 10px">
            {{ article.title }}
          </div>

          <div style="margin: 10px; display: flex">
            <div class="category" style="height: 100%; width: 40%">
              {{ categoryListS.map.get(article.categoryId!) }}
            </div>
            <tag v-model:id="article.id" v-model:tagS="tagS"></tag>
          </div>
          <div style="font-size: 15px; margin: 10px">
            <img src="@/assets/svg/火.svg" style="height: 100%" />
            浏览量{{ article.visitCount }}
          </div>
          <div style="font-size: 15px; margin: 10px">
            <p>
              发布于{{ article.createTime!.substring(0, 10) }}|更新于{{
                article.updateTime!.substring(0, 10)
              }}
            </p>
          </div>
        </div>
      </div>
      <div style="width: 40%; height: 100%; overflow: hidden">
        <el-image :src="article.image" />
      </div>
    </card>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="articleListS.total.value"
      :current-page="articleListS.current.value"
      :page-size="articleListS.size.value"
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
  .category {
    background-color: #3b82f6;
    color: rgba(255, 254, 255, 0.938);
    border-radius: 20px;
    @extend center;
  }
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
