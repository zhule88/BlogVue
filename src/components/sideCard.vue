<script setup lang="ts">
import card from "@/components/card.vue";
import svgIcon from "@/components/svgIcon.vue";
defineProps<{
  title: string;
  icon: string;
}>();
</script>
<template>
  <card>
    <div class="title">
      <div class="title_text">
        <svgIcon :name="icon" width="30" height="30" class="scale" />
        <span style="margin-left: 10px">{{ title }}</span>
      </div>
    </div>
    <slot></slot>
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
.scale {
  animation: scale 1s infinite;
  transform-origin: center;

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
