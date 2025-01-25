<script setup lang="ts">
import swiper from "./swiper.vue";
import { contentFilter } from "@/utils/filter";

const categoryListS = useCategoryList();
const tagS = useTag();
const articleListS = reactive(new ArticleList());

const colorI = new color();
const isShow = ref<boolean[]>([]);
const router = useRouter();
const loading = ref(true);

const articleLoad = async () => {
  await articleListS.page();
  loading.value = false;
};
const currentChange = async (value: number) => {
  articleListS.current = value;
  loading.value = true;
  articleLoad();
};
</script>

<template>
  <div>
    <swiper></swiper>
    <card
      @mouseenter="isShow[index] = true"
      @mouseleave="isShow[index] = false"
      @click="router.push(`/user/article/${article.id}`)"
      v-for="(article, index) in articleListS.list"
      v-animate
      v-lazy="{ callback: articleLoad }"
    >
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div style="display: flex; height: 100%">
            <div
              style="
                width: 53%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px;
              "
            >
              <div style="width: 50%; height: 30px">
                <el-skeleton-item
                  variant="h3"
                  style="width: 80%; height: 100%"
                />
              </div>
              <el-skeleton-item
                variant="text"
                style="width: 50%; height: 23px"
              />
              <div style="width: 50%; height: 15px">
                <el-skeleton-item
                  variant="text"
                  style="height: 100%; width: 25%"
                />
              </div>
              <el-skeleton-item
                variant="text"
                style="width: 50%; height: 15px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 50%; height: 15px"
              />
            </div>
            <div class="img" style="width: 47%; height: 100%">
              <el-skeleton-item
                variant="image"
                style="height: 100%; width: 100%"
              />
            </div>
          </div>
        </template>
        <template #default>
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
                <el tag v-for="item in article.tags">
                  {{ tagS.map.get(item) }}</el
                >
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
            <img :src="article.image" loading="lazy" />
          </div>
        </template>
      </el-skeleton>
    </card>

    <div style="display: flex; justify-content: center; align-items: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleListS.total"
        :current-page="articleListS.current"
        :page-size="articleListS.size"
        @current-change="currentChange"
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

.card:nth-child(even) {
  .img {
    border-radius: $open-left;
    order: -1;
  }
  .content:before {
    right: -16px;
  }
  .content {
    border-radius: $open-right;
  }
}
.card:nth-child(odd) {
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
</style>
