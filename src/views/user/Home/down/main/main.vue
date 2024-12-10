<script setup lang="ts">
import swiper from "./swiper.vue";
import { contentFilter } from "@/utils/filter";

const categoryListS = useCategoryList();
const articleListS = new ArticleList();

const colorI = new color();
const isShow = ref<boolean[]>([]);
const router = useRouter();
onMounted(async () => {
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
      style="z-index: 2"
      @mouseenter="isShow[index] = true"
      @mouseleave="isShow[index] = false"
      @click="router.push(`/user/article/${article.id}`)"
      v-for="(article, index) in articleListS.list.value"
      v-animate
      :class="[(index & 1) == 0 ? 'cardright' : 'cardleft']"
    >
      <div class="content" :style="{ '--color': colorI.random() }">
        <div
          style="display: flex; flex-direction: column"
          v-show="!isShow[index]"
        >
          <div style="font-size: 25px; margin: 10px">
            {{ article.title }}
          </div>
          <div style="margin: 10px; display: flex; height: 25px">
            <div class="category" :style="colorI.normal('backgroundColor')">
              {{ categoryListS.map.get(article.categoryId!) }}
            </div>
            <tag v-model:id="article.id"></tag>
          </div>
          <div class="text">
            <svgIcon name="火" class="svg" />
            浏览量:{{ article.visitCount }}
          </div>
          <div class="text">
            <svgIcon name="日历更新" class="svg" />
            发布于:{{ article.createTime }}
          </div>
          <div class="text">
            <svgIcon name="更新" class="svg" />
            更新于:{{ article.updateTime }}
          </div>
        </div>
        <div v-show="isShow[index]" class="content-text">
          {{ contentFilter(article.content).substring(0, 100) + "..." }}
        </div>
      </div>
      <div class="img">
        <img v-lazy="article.image" />
        <!-- <el-image :src="article.image" /> -->
      </div>
    </card>
    <div style="display: flex; justify-content: center; align-items: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleListS.total.value"
        :current-page="articleListS.current.value"
        :page-size="articleListS.size.value"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  height: 250px;
  .img {
    width: 47%;
    position: relative;

    height: 100%;
    overflow: hidden;
    /* .el-image  */
    img {
      width: 100%;
      height: 100%;
      object-position: center;
      transition: transform 0.5s;
      object-fit: cover;
    }
  }

  &:hover {
    img {
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
    width: 53%;
    height: 100%;
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
      line-height: 1.5;
      /*  color: var(--color-card); */
      color: rgba(255, 254, 255);
    }
    .category {
      color: rgba(255, 254, 255);
      border-radius: $border-radius;
      width: 5rem;

      font-size: 15px;
      @extend center;
    }
    .text {
      font-size: 15px;
      margin: 10px;
    }

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: -16px;
      background: var(--color);
      height: 32px;
      width: 32px;
      border-radius: 32px;

      transform-origin: 50% 50%;
      transition: transform 0.35s ease-out;
    }
  }
}
$open-left: $border-radius 0 0 $border-radius;
$open-right: 0 $border-radius $border-radius 0;
.cardleft {
  .el-image,
  .img {
    border-radius: $open-right;
  }
  .content:before {
    left: -16px;
  }
  .content {
    border-radius: $open-left;
  }
}
.cardright {
  flex-direction: row-reverse;
  .el-image,
  .img {
    border-radius: $open-left;
  }
  .content:before {
    right: -16px;
  }
  .content {
    border-radius: $open-right;
  }
}
</style>
