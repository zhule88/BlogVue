<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const prop = defineProps<{
  articleId: number;
  list: any[];
}>();
const isReply = reactive<boolean[]>([]);
const emit = defineEmits(["submit"]);
</script>
<template>
  <card v-for="(item, index) in list" v-animate>
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
      <svgIcon
        name="回复"
        style="margin-left: 10px"
        size="20px"
        @click="isReply[index] = !isReply[index]"
      />
    </div>
    <reply-box
      :articleId="articleId!"
      :parentId="item.id"
      @submit="isReply[index] = !isReply[index]"
      v-show="isReply[index]"
    ></reply-box>
  </card>
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
