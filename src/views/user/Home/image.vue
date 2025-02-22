<script setup lang="ts">
const coverS = reactive(new Cover());
const imageDuration = 7;
onMounted(() => {
  coverS.init(1);
});
const totalDuration = computed(() => coverS.list.length * imageDuration);
</script>
<template>
  <div class="imgs">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in coverS.list"
        :key="index"
        :style="{
          'background-image': 'url(' + item.url + ')',
          'animation-delay': `${index * imageDuration}s`,
        }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.imgs {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  background-color: #363636;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    .item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: no-repeat center center / cover;
      opacity: 0;
      animation: imageAnimation v-bind("totalDuration + 's'") linear infinite;
      animation-fill-mode: forwards;
    }

    @keyframes imageAnimation {
      0% {
        opacity: 0;
        transform: scale(1);
      }
      10% {
        opacity: 1;
        transform: scale(1.05);
      }
      35% {
        opacity: 0;
        transform: scale(1.1);
      }
      100% {
        opacity: 0;
      }
    }
  }
}
</style>
