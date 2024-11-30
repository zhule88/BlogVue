<script setup lang="ts"></script>
<template>
  <SideCard icon="铃铛" title="通知">
    <div>没有公告</div>
  </SideCard>
</template>

<style scoped lang="scss">
:deep(.animation) {
  animation: rotate 0.75s linear infinite;
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
}
</style>
