<script setup lang="ts">
import card from "@/components/card.vue";
import info from "@/views/user/Home/down/sidebar/info.vue";
</script>
<template>
  <div>
    <info></info>
    <card style="padding: 20px">
      <div style="display: flex; justify-content: center">
        <img
          class="small-bell"
          src="../../../../../assets/svg/铃铛.svg"
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
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: transform 0.5s;
  &:hover {
    transform: rotate(360deg);
  }
}
.maxim {
  border-radius: $border-radius;
  @extend center;
  width: 100%;
  text-align: center;
  color: bisque;
  writing-mode: vertical-lr;
}
.card-down {
  width: 50%;
  padding-bottom: 2rem;
  p {
    font-size: 20px;
    text-align: center;
  }
}
</style>
