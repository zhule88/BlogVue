<script setup lang="ts">
const commentS = reactive(new COmment());
const userS = reactive(new User());
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const detailList = computed(() => {
  return commentS.list.map((comment) => {
    return {
      ...userS.map.get(comment.userId!),
      ...comment,
    };
  });
});
const prop = defineProps<{
  articleId: number;
}>();
onMounted(async () => {
  commentS.item.articleId = prop.articleId;
  await commentS.init();
  userS.listByIds([...new Set(commentS.list.map((c) => c.userId!))]);
});
</script>
<template>
  <div>
    <reply-box :articleId="articleId!" @submit="commentS.init()"></reply-box>
    <div style="font-size: 30px; font-weight: 600; margin: 20px 0">
      留言 {{ commentS.list.length }}
    </div>
    <card v-for="item in detailList" v-animate>
      <div style="width: 100%; display: flex">
        <el-avatar :src="item.avatar" v-if="item.avatar" fit="cover" />
        <img
          src="../../../assets/image/默认头像.png"
          style="height: 40px"
          v-else
        />
        <div style="font-size: 20px; margin: auto 0 auto 5px">
          {{ item.username }}
        </div>
        <div style="font-size: 15px; margin-left: auto">
          {{ item.createTime }}
        </div>
      </div>
      <MdPreview v-model="item.content" />
      <div style="display: flex">
        <el tag style="margin-right: 5px"> {{ item.location }}</el>
        <el tag>{{ item.browser }}</el>
        <svgIcon name="查看回复" style="margin-left: auto" size="20px" />
        <svgIcon name="点赞" style="margin-left: 10px" size="20px" alt="" />
        <svgIcon name="回复" style="margin-left: 10px" size="20px" />
      </div>
    </card>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  min-height: 50px;
  margin: 5px 0;
  padding: 0.5rem 1rem;

  :deep(#md-editor-v3) {
    background-color: var(--color-card);
    font-family: cartoon;
    color: var(--text-color);
    transition: $transition;
    margin: 5px 0;
    common {
      margin: 0;
      color: var(--text-color);
    }
    h1 {
      font-size: 25px;
      @extend common;
    }
    h2 {
      font-size: 23px;
      @extend common;
    }
    h3 {
      font-size: 21px;
      @extend common;
    }
    h4 {
      font-size: 19px;
      @extend common;
    }
    h5 {
      font-size: 17px;

      @extend common;
    }
    h6,
    p {
      font-size: 15px;
      @extend common;
    }
  }
}
</style>
