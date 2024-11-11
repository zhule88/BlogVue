<script setup lang="ts">
import card from "@/components/card.vue";
</script>
<template>
  <div>
    <card>
      <div class="card-up">
        <img class="avatar" src="../../../../assets/xiubi.jpg" alt="" />
        <div class="maxim">
          <p>正在路上</p>
        </div>
      </div>
      <div style="display: flex">
        <div class="card-down">
          <p>文章</p>
          <p>114514</p>
        </div>
        <div class="card-down">
          <p>评论</p>
          <p>1919810</p>
        </div>
      </div>
    </card>
    <card style="padding: 20px">
      <div style="display: flex; justify-content: center">
        <img
          class="lingdang"
          src="../../../../assets/014_通知-35.svg"
          style="height: 30px"
        />
      </div>
      <p>没有公告</p>
    </card>
  </div>
</template>

<style scoped lang="scss">
.lingdang {
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
.card-up {
  background: url("../../../../assets/你的名字.jpg");
  background-size: 150%;
  border-radius: $border-radius;
  width: 100%;
  height: 100%;
  display: flex;
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
