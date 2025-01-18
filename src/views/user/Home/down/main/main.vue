<script setup lang="ts">
import swiper from "./swiper.vue";
import { contentFilter } from "@/utils/filter";

const categoryListS = useCategoryList();
const tagS = useTag();
const articleListS = reactive(new ArticleList());

const colorI = new color();
const isShow = ref<boolean[]>([]);
const router = useRouter();
onMounted(() => {
  articleListS.page();
});
const handleCurrentChange = (value: number) => {
  articleListS.current = value;
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
      v-for="(article, index) in articleListS.list"
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
            <el tag v-for="item in article.tags"> {{ tagS.map.get(item) }}</el>
          </div>
          <div class="text">
            <svgIcon name="火" />
            浏览量:{{ article.visitCount }}
          </div>
          <div class="text">
            <svgIcon name="日历更新" />
            发布于:{{ article.createTime }}
          </div>
          <div class="text">
            <svgIcon name="更新" />
            更新于:{{ article.updateTime }}
          </div>
        </div>
        <div v-show="isShow[index]" class="content-text">
          {{ contentFilter(article.content).substring(0, 100) + "..." }}
        </div>
      </div>
      <div class="img">
        <img :src="article.image" />
      </div>
    </card>
    <div style="display: flex; justify-content: center; align-items: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleListS.total"
        :current-page="articleListS.current"
        :page-size="articleListS.size"
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
      transition: $transition;
    }
  }
}
$open-left: $border-radius 0 0 $border-radius;
$open-right: 0 $border-radius $border-radius 0;
.cardleft {
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
