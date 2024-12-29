<script setup lang="ts">
import { timeFilter } from "@/utils/filter";
const articleS = useArticle();
const tagS = useTag();
const categoryListS = useCategoryList();
const articleLength = ref<number>(0);

onMounted(() => {
  init();
});
watch(articleS, () => {
  init();
});
const init = () => {
  articleLength.value = contentFilter(articleS.item.content).length;
};
</script>
<template>
  <div class="contain">
    <div class="content">
      <div style="display: flex; flex-direction: column">
        <div class="text">
          <div class="category">
            {{ categoryListS.map.get(articleS.item.categoryId!) }}
          </div>
          <div v-for="item in articleS.item.tags" style="margin: 0 0 0 20px">
            #{{ tagS.map.get(item) }}
          </div>
        </div>
        <div class="text" style="font-size: 45px; font-weight: 800">
          {{ articleS.item.title }}
        </div>
        <div class="text">
          <div>
            <svgIcon name="火" color="white" />
            {{ articleS.item.visitCount }}
          </div>
          <div>
            <svgIcon name="文章" color1="white" />
            <span v-if="articleLength >= 1000">
              {{ (articleLength / 1000).toFixed(1) }}k
            </span>
            <span v-else>
              {{ articleLength }}
            </span>
            字
          </div>
          <div>
            <svgIcon name="时间" color1="white" />
            {{ Math.ceil(articleLength / 200) }}分钟
          </div>
        </div>
        <div class="text">
          <div>
            <svgIcon name="日历更新" color1="white" />
            {{ timeFilter(articleS.item.createTime) }}
          </div>
          <div>
            <svgIcon name="更新" color1="white" />
            {{ timeFilter(articleS.item.updateTime) }}
          </div>
        </div>
      </div>
    </div>
    <img :src="articleS.item.image" class="img" />
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
  .img {
    z-index: -5;
    width: 100%;
    position: absolute;
    top: 50%;
    /* scale: (1.1); */
    transform: translateY(-50%);
    filter: brightness(50%);
  }
  .content {
    position: relative;
    @extend center;
    .text {
      color: #ffffff;
      font-size: 16px;
      margin: 10px;
      display: flex;
      align-items: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      & > div {
        margin: 0 10px 0 0;
      }
    }
  }
}
</style>
