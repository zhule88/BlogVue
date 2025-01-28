<script setup lang="ts"></script>
<template>
  <layout title="留言">
    <div style="width: 80%; margin: 0 auto">
      <div class="greet">
        <div>欢迎留言</div>
      </div>
      <commentArea :articleId="0"></commentArea>
    </div>
  </layout>
</template>

<style lang="scss" scoped>
.greet {
  @extend center;
  height: 400px;
  font-size: 40px;
  flex-direction: column;
}
.danmu {
  margin-top: 50px;
  width: 100vw;
  height: 400px;
  .danmu_item {
    @extend center;
    color: var(--text-color);
  }
}
</style>
