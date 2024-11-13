<script setup lang="ts">
import { onMounted, ref } from "vue";
import DayNightToggleButton from "@/layout/user/Header/DayNightToggle";
import { useColorMode } from "@vueuse/core";
const isHeader = ref(true);
const mode = useColorMode();
onMounted(() => {
  customElements.define("toggle-button", DayNightToggleButton);
});
function changeToggle({ detail }: any) {
  mode.value = detail;
}
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
      <router-link to="/" style="text-decoration: none; width: 80%"
        ><p>筑乐</p></router-link
      >
      <el-menu
        style="width: 80%; border: none"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="1"
          ><img src="../../../assets/single.svg" />文章</el-menu-item
        >
        <el-menu-item index="1"
          ><img src="../../../assets/category.svg" />归档</el-menu-item
        >
        <el-menu-item index="1"
          ><img src="../../../assets/014_聊天对话-38.svg" />留言</el-menu-item
        >
        <el-menu-item index="1"
          ><img src=".../../../assets/heart.svg" />随想</el-menu-item
        >

        <!-- 日夜切换 -->
      </el-menu>
      <div style="margin-right: 4.5rem; margin-top: -0.2rem">
        <toggle-button @change="changeToggle" size="1"></toggle-button>
      </div>
    </header>
  </transition>
</template>

<style lang="scss" scoped>
header {
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
    background-color: rgba(125, 142, 159, 0);
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
  /*  background-image: url("../../assets/logo.png");
  background-clip: text;
  -webkit-background-clip: text; */
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
