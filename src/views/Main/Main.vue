<script setup lang="ts"></script>
<template>
  <main style="padding: 0">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.el-main {
  // 浏览器宽度 - 滚动条宽度，设置为100vw首页底部会出现滚动条
  width: 100%;
  // 屏幕小910
  @media screen and (max-width: 910px) {
    width: 100vw;
  }
}
</style>
