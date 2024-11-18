<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CategoryList, Tag, ArticleList } from "@/service";
import swiper from "./main/swiper.vue";
import tag from "@/components/tag.vue";
import card from "@/components/card.vue";

const articleListS = new ArticleList();
const categoryListS = new CategoryList();
const tagS = new Tag();

const isShow = ref<boolean[]>([]);

onMounted(async () => {
  categoryListS.init();
  tagS.init();
  articleListS.page();
});
const handleCurrentChange = (value: number) => {
  articleListS.current.value = value;
  articleListS.page();
};
</script>

<template>
  <div>
    <swiper></swiper>
    <card
      @mouseover="isShow[index] = true"
      @mouseout="isShow[index] = false"
      v-for="(article, index) in articleListS.list.value"
      :class="[(index & 1) == 0 ? 'cardright' : 'cardleft']"
    >
      <div class="content" style="width: 55%; height: 100%">
        <div
          style="display: flex; flex-direction: column"
          v-show="!isShow[index]"
        >
          <div style="font-size: 25px; margin: 10px">
            {{ article.title }}
          </div>
          <div style="margin: 10px; display: flex">
            <div class="category">
              {{ categoryListS.map.get(article.categoryId!) }}
            </div>
            <tag v-model:id="article.id" v-model:tagS="tagS"></tag>
          </div>
          <div class="text">
            <img src="../../../../assets/svg/火.svg" />
            浏览量:{{ article.visitCount }}
          </div>
          <div class="text">
            <img src="../../../../assets/svg/日历.svg" />
            发布于:{{ article.createTime }}
          </div>
          <div class="text">
            <img src="../../../../assets/svg/日历更新.svg" />
            更新于:{{ article.updateTime }}
          </div>
        </div>
        <div v-show="isShow[index]" class="content-text">
          {{
            article.content.replace(/<[^>]*>|#/g, "").substring(0, 100) + "..."
          }}
        </div>
      </div>
      <div style="width: 45%; height: 100%; overflow: hidden">
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
.card {
  display: flex;
  height: 250px;

  .el-image {
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    object-fit: cover;
  }
  &:hover {
    .el-image {
      transform: scale(1.1);
    }
    .content:before {
      transform: scale(35);
    }
  }
  .content {
    display: flex;
    position: relative;
    background-color: var(--color-card);
    border-radius: $border-radius;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    @extend center;

    .content-text {
      @extend center;
      max-width: 30ch;
      overflow-wrap: break-word;
      font-size: 20px;
      color: var(--color-card);
    }
    .category {
      background-color: $sky-blue;
      color: rgba(255, 254, 255, 0.938);
      border-radius: $border-radius;
      width: 5rem;
      font-size: 15px;
      @extend center;
    }
    .text {
      font-size: 15px;
      margin: 10px;
    }
    img {
      height: 15px;
    }

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: -16px;
      background: $sky-blue;
      height: 32px;
      width: 32px;
      border-radius: 32px;
      transform: scale(1);
      transform-origin: 50% 50%;
      transition: transform 0.35s ease-out;
    }
  }
}
.cardleft {
  .el-image {
    border-radius: 0 $border-radius $border-radius 0;
  }
  .content:before {
    left: -16px;
  }
  .content {
    border-radius: $border-radius 0 0 $border-radius;
  }
}
.cardright {
  flex-direction: row-reverse;
  .el-image {
    border-radius: $border-radius 0 0 $border-radius;
  }
  .content:before {
    right: -16px;
  }
  .content {
    border-radius: 0 $border-radius $border-radius 0;
  }
}
</style>
