<script setup lang="ts"></script>

<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-header>
        <el-menu mode="horizontal">
          <div style="height: 60px; width: 300px">
            <meting-js
              server="netease"
              type="playlist"
              id="12696492979"
              list-folded="true"
            >
            </meting-js>
          </div>
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="1">首页</el-menu-item>
        </el-menu>
      </el-header>
      <RouterView />
      <el-footer style="position: absolute; width: 100%; bottom: 0"
        >Footer</el-footer
      >
    </el-container>
  </div>
</template>

<style scoped></style>
