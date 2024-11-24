<script setup lang="ts">
import dualL from "@/components/layout/dualL.vue";
import { Article, Tag, File, ArticleTag } from "@/service";
const route = useRoute();

const articleS = new Article();

const fileS = new File();
const articletagS = new ArticleTag();
onMounted(() => {
  const articleId = route.query.id as any;
  articleS.init(articleId);
  articletagS.init(articleId);
  fileS.init(articleId);
});
</script>
<template>
  <!-- <dualL> </dualL> -->
  <div class="contain">
    <div class="content">
      <div style="display: flex; flex-direction: column">
        <div
          class="text"
          style=" font-size: 45px;
  font-weight: 800; /"
        >
          {{ articleS.item.value.title }}
        </div>
        <div class="text">
          <svgIcon name="火" color="white" />
          浏览量:{{ articleS.item.value.visitCount }}
        </div>
        <div class="text">
          <svgIcon name="日历" color="white" />
          发布于:{{ articleS.item.value.createTime }}
        </div>
        <div class="text">
          <svgIcon name="日历更新" color="white" />
          更新于:{{ articleS.item.value.updateTime }}
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
  .svg {
    transform: translateY(10%);
  }
  .img {
    z-index: -5;
    width: 100%; /* 图片宽度占满 100% */
    height: auto; /* 高度自动，保持原始比例 */
    position: absolute; /* 设置绝对定位以便更灵活地控制位置 */
    top: 50%; /* 向下移动 50% ，使中间部分可见 */
    transform: translateY(-50%); /* 再向上移动一半高度，使中心对齐 */
    filter: brightness(50%);
  }
  .content {
    position: relative;
    @extend center;

    .content-text {
      @extend center;
      max-width: 30ch;
      overflow-wrap: break-word;
      font-size: 20px;
    }
    .text {
      color: #ffffff;
      font-size: 15px;
      margin: 10px;
      /*   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
    }
  }
}
</style>
