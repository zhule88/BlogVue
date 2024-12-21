<script setup lang="ts"></script>
<template>
  <header>
    <el-menu border:true mode="horizontal" :ellipsis="false" :router="true">
      <el-sub-menu index="">
        <template #title>文章</template>
        <el-menu-item index="/admin/list">总览</el-menu-item>
        <el-menu-item index="/admin/add">新增</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/admin/link">友联</el-menu-item>
      <el-menu-item
        ><a href="http://localhost:8000/doc.html#/home" target="_blank"
          >接口文档</a
        ></el-menu-item
      >
    </el-menu>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100vw;
  box-sizing: border-box;
  z-index: 999;
  top: 0;
  background-color: rgba(28, 124, 220, 0.926);
  display: flex;
  align-items: center;
  height: 45px;
  .el-menu {
    display: flex;
    justify-content: flex-end;
    background-color: rgba(28, 124, 220, 0.926);
    font-weight: bold;

    height: 45px;
  }
}
</style>
