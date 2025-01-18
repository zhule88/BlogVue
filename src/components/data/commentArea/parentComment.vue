<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const commentListS = useCommentList();
defineProps<{
  articleId: number;
}>();
const isChild = reactive<boolean[]>([]);
const isReply = reactive<boolean[]>([]);
</script>
<template>
  <card v-for="(item, index) in commentListS.parentList" v-animate>
    <div style="width: 100%; display: flex; align-items: center">
      <el-avatar :src="item.avatar" v-if="item.avatar" fit="cover" />
      <img
        src="../../../assets/image/默认头像.png"
        style="height: 40px"
        v-else
      />
      <div style="font-size: 20px; margin-left: 5px">
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
      <svgIcon
        name="查看回复"
        size="20px"
        style="margin-left: auto"
        @click="isChild[index] = !isChild[index]"
      />
      <span
        style="font-size: 20px; font-weight: 500; transform: translateY(-10%)"
        >{{
          commentListS.childList?.get(item.id!)
            ? commentListS.childList?.get(item.id!)?.length
            : ""
        }}</span
      >
      <svgIcon name="点赞" style="margin: 0 10px" size="20px" alt="" />
      <svgIcon
        name="回复"
        size="20px"
        @click="isReply[index] = !isReply[index]"
      />
    </div>
    <reply-box
      ref="replyRef"
      :articleId="articleId!"
      :parentId="item.id"
      :userName="item.username"
      :isShow="isReply[index]"
      @submit="isReply[index] = !isReply[index]"
      v-show="isReply[index]"
    ></reply-box>

    <ChildComment
      :article-id="articleId"
      :parentId="item.id!"
      v-if="isChild[index]"
    ></ChildComment>
  </card>
</template>

<style scoped lang="scss">
@import "./md.scss";
.card {
  box-sizing: border-box;
  min-height: 50px;
  margin: 5px 0;
  padding: 0.5rem 1rem;

  :deep(#md-editor-v3) {
    background-color: var(--color-card);
  }
}
</style>
