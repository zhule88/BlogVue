<script setup lang="ts">
import vueDanmaku from "vue3-danmaku";
const commentListS = useCommentList();
</script>
<template>
  <layout title="留言">
    <vue-danmaku
      v-model:danmus="commentListS.parentList"
      class="danmu"
      loop
      :speeds="75"
      useSlot
      :top="20"
      :right="10"
      randomChannel
      :debounce="5000"
    >
      <template v-slot:dm="{ danmu }">
        <div>
          <div class="danmu_item">
            <el-avatar :src="danmu.avatar" />{{ danmu.username }}:
            {{ danmu.content }}
          </div>
        </div>
      </template>
    </vue-danmaku>

    <div style="width: 80%; margin: 0 auto">
      <!--  <div class="greet">
          <div>欢迎来到我的博客</div>
        <div>在这里留下自己的足迹吧~</div>
      </div> -->
      <commentArea :articleId="0"></commentArea>
    </div>
  </layout>
</template>

<style lang="scss" scoped>
/* .greet {
  @extend center;
  height: 400px;
  flex-direction: column;
} */
.danmu {
  margin-top: 50px;
  width: 100%;
  height: 400px;
  .danmu_item {
    @extend center;
    color: var(--text-color);
  }
}
</style>
