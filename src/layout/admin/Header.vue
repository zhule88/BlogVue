<script setup lang="ts">

</script>
<template>
    <header>
      <menu
        border: none
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="1"
          >文章</el-menu-item
        >
        <el-menu-item index="1"
          >归档</el-menu-item
        >
        <el-menu-item index="1"
          >留言</el-menu-item
        >
        <el-menu-item index="1"
          >随想</el-menu-item
        >
      </menu>
    </header>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: rgba(60, 58, 58, 0.4);
  display: flex;
  align-items: center;
  height: 45px;
  box-sizing: border-box;
  top: 0;
  z-index: 999;
  width: 100vw;

  .el-menu {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    background-color: rgba(248, 249, 250, 0);
    height: 45px;
  }
}

</style>
