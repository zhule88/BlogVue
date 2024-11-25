<script setup lang="ts">
import dualL from "@/components/layout/dualL.vue";
import { Article, File, ArticleTag } from "@/service";
import { useTag, useCategoryList } from "@/stores";
const tagS = useTag();
const categoryListS = useCategoryList();
const route = useRoute();

const articleS = new Article();
const fileS = new File();
const articletagS = new ArticleTag();
const articleLength = ref<number>(0);
const articleLLength = ref<string | number>(0);
onMounted(async () => {
  const articleId = route.query.id as any;
  await articleS.init(articleId);
  articletagS.init(articleId);
  fileS.init(articleId);
  articleLength.value = articleS.item.value.content.replace(
    /<[^>]*>|#|>/g,
    ""
  ).length;
  if (articleLength.value >= 1000) {
    articleLLength.value = (articleLength.value / 1000).toFixed(1) + "k";
  } else {
    articleLLength.value = articleLength.value;
  }
});
</script>
<template>
  <!-- <dualL> </dualL> -->
  <div class="contain">
    <div class="content">
      <div style="display: flex; flex-direction: column">
        <div class="text">
          <div class="category">
            {{ categoryListS.map.get(articleS.item.value.categoryId!) }}
          </div>
          <div v-for="item in tagS.list" style="margin: 0 0 0 20px">
            #{{ item.name }}
          </div>
        </div>
        <div class="text" style="font-size: 45px; font-weight: 800">
          {{ articleS.item.value.title }}
        </div>
        <div class="text">
          <div class="item">
            <svgIcon name="火" color="white" class="svg" />

            {{ articleS.item.value.visitCount }}
          </div>
          <div class="item">
            <svgIcon name="文章" color="white" class="svg" />
            {{ articleLLength }}字
          </div>
          <div class="item">
            <svgIcon name="时间" color="white" class="svg" />
            {{ Math.ceil(articleLength / 250) }}分钟
          </div>
        </div>

        <div class="text">
          <div class="item">
            <svgIcon name="日历更新" color="white" class="svg" />
            {{ articleS.item.value.createTime?.substring(0, 10) }}
          </div>
          <div class="item">
            <svgIcon name="更新" color="white" class="svg" />
            {{ articleS.item.value.updateTime?.substring(0, 10) }}
          </div>
        </div>
      </div>
    </div>
    <img :src="articleS.item.value.image" class="img" />
  </div>
</template>

<style scoped lang="scss">
.contain {
  width: 100%;
  height: 50vh;
  overflow: hidden;
  position: relative;
  @extend center;
  .category {
    @extend center;
    color: rgba(255, 254, 255, 0.938);
    border-radius: $border-radius;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    padding: 0 0.5rem;
    height: 2rem;
  }
  .svg {
    transform: translateY(10%);
  }
  .img {
    z-index: -5;
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    filter: brightness(50%);
  }
  .content {
    position: relative;
    @extend center;
    .text {
      color: #ffffff;
      font-size: 15px;
      margin: 10px;
      display: flex;
      align-items: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      .item {
        margin: 0 10px 0 0;
      }
    }
  }
}
</style>
