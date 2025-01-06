<script setup lang="ts">
const imageList = ref([
  "/src/assets/凯文1.webp",
  "/src/assets/凯文2.webp",
  "/src/assets/凯文3.webp",
  "/src/assets/英桀1.jpg",
  "/src/assets/英桀2.webp",
  "/src/assets/英桀3.jpg",
]);
</script>
<template>
  <div class="imgs">
    <ul>
      <li
        class="item"
        v-for="(image, index) in imageList"
        :key="index"
        :style="{
          'background-image': 'url(' + image + ')',
        }"
      ></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.imgs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-color: #363636;
  overflow: hidden;

  .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50% / cover;
    opacity: 0;
    // 一张图片 6s
    animation: imageAnimation 30s linear infinite 0s;

    &:nth-child(2) {
      animation-delay: 6s;
    }

    &:nth-child(3) {
      animation-delay: 12s;
    }

    &:nth-child(4) {
      animation-delay: 18s;
    }

    &:nth-child(5) {
      animation-delay: 24s;
    }

    &:nth-child(6) {
      animation-delay: 30s;
    }
  }
}

@keyframes imageAnimation {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: scale(1.05);
  }
  25% {
    opacity: 0;
    transform: scale(1.1);
  }
}
</style>
