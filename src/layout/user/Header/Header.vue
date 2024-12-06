<script setup lang="ts">
import DayNightToggleButton from "@/layout/user/Header/DayNightToggle";
import { Document, Files, ChatLineSquare } from "@element-plus/icons-vue";
import "animate.css";
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
      <router-link to="/" style="text-decoration: none"
        ><div class="name">筑乐</div>
      </router-link>

      <el-menu style="border: none" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="1">
          <el-icon><Document /></el-icon><img />文章</el-menu-item
        >
        <el-menu-item index="archive/article"
          ><el-icon><Files /></el-icon>归档</el-menu-item
        >
        <el-menu-item index="1">
          <el-icon><ChatLineSquare /></el-icon>留言</el-menu-item
        >

        <!-- 日夜切换 -->
        <div style="margin-left: 5rem">
          <toggle-button @change="changeToggle" size="1"></toggle-button>
        </div>
      </el-menu>
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
  .name {
    font-size: 30px;
    text-align: left;
    margin: 20px;
    font-weight: 500;
    color: var(--text-color);
    &:hover {
      color: $sky-blue;
    }
  }
  .el-menu {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    background-color: rgba(125, 142, 159, 0);
    height: 45px;
    /*  @media screen and (max-width: 910px) {
      display: none;
    } */
    .el-menu-item {
      right: 0;
      margin: 0;
      font-size: 15px;
    }
  }
}
</style>
