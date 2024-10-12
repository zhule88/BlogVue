<script setup lang="ts">
import { ref } from "vue";

const isHeader = ref(true);
addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    // 向下滚动
    // console.log('向下滚动');
    isHeader.value = false;
  } else if (event.deltaY < 0) {
    // 向上滚动
    // console.log('向上滚动');
    isHeader.value = true;
  }
});
</script>
<template>
  <!-- Animate.css 实现 -->
  <transition
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <!-- 第二种实现菜单滑入滑出的方法 name="el-zoom-in-top" element-plus实现 -->
    <el-header v-show="isHeader">
      <p>筑乐</p>

      <el-menu
        style="width: 100%; border: none"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="1">文章</el-menu-item>
        <el-menu-item index="1">力扣</el-menu-item>
        <el-menu-item index="1">归档</el-menu-item>
        <el-menu-item index="1">留言</el-menu-item>
        <el-menu-item index="1">随想</el-menu-item>
      </el-menu>
    </el-header>
  </transition>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  height: 45px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;

  .el-menu {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    background-color: rgba(248, 249, 250, 0);
    height: 45px;
    @media screen and (max-width: 910px) {
      display: none;
    }
    .el-menu-item {
      right: 0;
      margin: 0;
    }
  }
}
/* .el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: all 0.5s;
} */
// 头部缩回去的动画 放弃使用
/* .el-header-enter-active,
.el-header-leave-active {
  transition: all 0.8s;
}

.el-header-leave-from,
.el-header-leave-to {
  transform: translateY(-100%);
} */
</style>
