<script setup lang="ts">
import { loadOml2d } from "oh-my-live2d";
import { onMounted } from "vue";
import something from "./something.vue";
onMounted(() => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
});
loadOml2d({
  dockedPosition: "left",
  menus: {
    disable: true,
    items: [],
  },
});
</script>

<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-header>
        <div class="navbar bg-base-100">
          <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">筑乐</a>
          </div>

          <ul class="menu menu-horizontal bg-base-100">
            <li>
              <button class="btn btn-outline"><something></something></button>
            </li>
            <li><button class="btn btn-outline">文章</button></li>
            <li><button class="btn btn-outline">力扣</button></li>
            <li><button class="btn btn-outline">归档</button></li>
            <li><button class="btn btn-outline">留言</button></li>
            <li><button class="btn btn-outline">随想</button></li>
          </ul>
        </div>
      </el-header>

      <el-main style="width: 75%; margin: 0 auto">
        <RouterView />
      </el-main>

      <el-footer
        style="position: absolute; width: 100%; bottom: 0; text-align: center"
        >Footer</el-footer
      >
    </el-container>
  </div>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: 70%;
}
</style>
