<script setup lang="ts">
import card from "@/components/card.vue";
import info from "@/views/user/Home/down/sidebar/info.vue";
import svgIcon from "@/components/svgIcon.vue";
</script>
<template>
  <div>
    <info></info>
    <card style="padding: 20px">
      <div style="display: flex; justify-content: center">
        <img
          class="small-bell"
          src="../../../../../assets/icons/铃铛.svg"
          style="height: 30px"
        />
      </div>
      <p>没有公告</p>
    </card>
  </div>
</template>

<style scoped lang="scss">
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
