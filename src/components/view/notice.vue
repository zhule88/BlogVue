<script setup lang="ts"></script>
<template>
  <card>
    <div class="title">
      <div class="title_text">
        <svgIcon name="铃铛" width="30" height="30" class="small-bell" />
        <span style="margin-left: 10px">公告</span>
      </div>
    </div>
    <div class="content">
      <div style="width: 80%">没有公告</div>
    </div>
  </card>
</template>

<style scoped lang="scss">
.title {
  border-radius: $border-radius $border-radius 0 0;
  z-index: 2;
  display: flex;
  padding: 10px;
  align-items: center;
  font-size: 20px;
  .title_text {
    display: flex;
    align-items: center;
  }
}
.content {
  width: 100%;
  padding-bottom: 20px;
  @extend center;
}
.small-bell {
  animation: rotate 0.75s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
