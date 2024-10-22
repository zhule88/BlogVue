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
    <header v-show="isHeader">
      <button style="height: 66.6%; width: 20%">
        <p>筑乐</p>
        <!-- <img src="../assets/logo (2).png" style="height: 100%;"></img> -->
      </button>
      <el-menu
        style="width: 80%; border: none"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="1"
          ><img src="../assets/single.svg" />文章</el-menu-item
        >
        <el-menu-item index="1"
          ><img src="../assets/category.svg" />归档</el-menu-item
        >
        <el-menu-item index="1"
          ><img src="../assets/014_聊天对话-38.svg" />留言</el-menu-item
        >
        <el-menu-item index="1"
          ><img src="../assets/heart.svg" />随想</el-menu-item
        >
      </el-menu>
    </header>
  </transition>
</template>

<style lang="scss" scoped>
header {
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
  padding: 0;
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
p {
  background-image: url("../assets/logo.png");
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 30px;
  text-align: left;
}
img {
  height: 25px;
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
