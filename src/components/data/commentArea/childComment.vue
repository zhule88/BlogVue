<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
defineProps<{
  articleId: number;
  parentId: number;
}>();
const commentListS = useCommentList();
const isReply = reactive<boolean[]>([]);
</script>
<template>
  <card v-for="(item, index) in commentListS.childList.get(parentId)" v-animate>
    <div style="width: 100%; display: flex; align-items: center">
      <el-avatar :src="item.avatar" v-if="item.avatar" fit="cover" />
      <img
        src="../../../assets/image/默认头像.png"
        style="height: 40px"
        v-else
      />
      <div style="font-size: 20px; display: flex; margin-left: 5px">
        {{ item.username }}
        <el tag style="margin-right: 5px"> {{ item.location }}</el>
        <el tag>{{ item.browser }}</el>
      </div>
      <div style="font-size: 15px; margin-left: auto">
        {{ item.createTime }}
      </div>
    </div>
    <div style="width: 100%; display: flex; align-items: center">
      <MdPreview v-model="item.content" />
      <div style="margin-bottom: 1.3rem; margin-top: auto; display: flex">
        <svgIcon name="点赞" style="margin: 0 10px" size="20px" alt="" />
        <svgIcon
          name="回复"
          size="20px"
          @click="isReply[index] = !isReply[index]"
        />
      </div>
    </div>
    <reply-box
      :articleId="articleId"
      :parentId="parentId"
      :replyId="item.id"
      :userName="item.username"
      :isShow="isReply[index]"
      @submit="isReply[index] = !isReply[index]"
      v-show="isReply[index]"
    ></reply-box>
  </card>
</template>

<style scoped lang="scss">
@import "./md.scss";
.card {
  box-sizing: border-box;
  min-height: 50px;
  margin: 5px 0;
  padding: 0.5rem 1rem;
}
:deep(#md-editor-v3) {
  background-color: var(--color-card);
}
</style>
