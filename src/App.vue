<script setup lang="ts">
import { loadOml2d } from "oh-my-live2d";
loadOml2d({
  dockedPosition: "right",
});
</script>

<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-header>
        <el-menu mode="horizontal">
          <el-menu-item index="1">文章</el-menu-item>
          <el-menu-item index="1">归档</el-menu-item>
          <el-menu-item index="1">力扣</el-menu-item>
          <el-menu-item index="1">随想</el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="text-align: center">
        <meting-js
          server="netease"
          type="playlist"
          id="12696492979"
          list-folded="true"
          fixed="true"
          theme="#FF0000"
        >
        </meting-js>
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
