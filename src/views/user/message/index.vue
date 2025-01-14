<script setup lang="ts"></script>
<template>
  <layout title="留言">
    <div style="width: 80%; margin: 0 auto">
      <div class="greet">
        <div>欢迎来到我的博客</div>
        <div>在这里留下自己的足迹吧~</div>
      </div>
      <comment :articleId="0"></comment>
    </div>
  </layout>
</template>

<style lang="scss" scoped>
.greet {
  @extend center;
  width: 100%;
  height: 300px;
  font-size: 30px;
  font-weight: 500;
  flex-direction: column;
}
</style>
