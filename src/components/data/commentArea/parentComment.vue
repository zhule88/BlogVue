<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
import type comment from "@/types/modules/comment";
const commentListS = useCommentList();
const likeS = useLike();
const userS = useUser();
const like = async (coommentId: number, index: number, item: comment) => {
  if (userS.item.id) {
    likeS.change(userS.item.id, coommentId);
    if (isLike[index]) {
      item.like!--;
    } else {
      item.like!++;
    }
    isLike[index] = !isLike[index];
  } else {
    ElMessage.error("点赞请登录");
  }
};
defineProps<{
  articleId: number;
}>();
const isLike = reactive<boolean[]>([]);
const isChild = reactive<boolean[]>([]);
const isReply = reactive<boolean[]>([]);
onMounted(() => {
  userLikeGet();
});

watch(likeS.commentList, () => {
  userLikeGet();
});
const userLikeGet = () => {
  commentListS.parentList.forEach((element, index) => {
    if (likeS.commentList.includes(element.id!)) {
      isLike[index] = true;
    }
  });
};
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
      <div style="display: flex; margin-left: auto">
        <div class="icon">
          <svgIcon
            name="查看回复"
            size="20px"
            @click="isChild[index] = !isChild[index]"
            v-if=" commentListS.childList?.get(item.id!)"
          />
          <span class="number">
            {{
              commentListS.childList?.get(item.id!)
                ? commentListS.childList?.get(item.id!)?.length
                : ""
            }}
          </span>
        </div>
        <div class="icon">
          <svgIcon
            name="点赞"
            size="20px"
            @click="like(item.id!, index, item)"
            v-show="!isLike[index]"
          />
          <svgIcon
            name="已点赞"
            size="20px"
            color="#3b82f6 "
            @click="like(item.id!, index, item)"
            v-show="isLike[index]"
          />

          <span class="number">{{ item.like == 0 ? "" : item.like }}</span>
        </div>
        <div class="icon">
          <svgIcon
            name="回复"
            size="20px"
            @click="isReply[index] = !isReply[index]"
          />
        </div>
      </div>
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

:deep(#md-editor-v3) {
  background-color: var(--color-card);
}
</style>
