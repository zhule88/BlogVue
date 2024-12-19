<script setup lang="ts">
import darkk from "../../assets/image/莫娜.jpg";
import light from "../../assets/image/蓝天.jpg";
defineProps<{
  Two?: boolean;
  Title?: string;
}>();
const bg = ref();
const isDark = useDark({
  onChanged(dark: boolean) {
    bg.value = dark ? darkk : light;
  },
});
onMounted(() => {
  bg.value = isDark.value ? darkk : light;
});
</script>

<template>
  <div style="width: 100%">
    <div class="layout" :style="{ 'background-image': 'url(' + bg + ')' }">
      <div style="width: 77%; display: flex" v-if="Two">
        <div class="main">
          <slot name="main"></slot>
        </div>
        <div class="sidebar">
          <slot name="sidebar"></slot>
        </div>
      </div>
      <div style="width: 80%" v-else>
        <div class="banner">
          <h2 class="title">{{ Title }}</h2>
        </div>
        <card>
          <slot></slot>
        </card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  width: 100%;
  .main {
    width: 75%;
    /*  @media screen and (max-width: 1000px) {
    width: 100%;
  } */
  }
  .sidebar {
    width: 23%;
    margin-left: auto;
    /*  @media screen and (max-width: 1000px) {
    display: none;
  } */
  }
  .banner {
    @extend center;
    height: 50vh;
    width: 100%;
    .title {
      color: white;
      font-size: 4.6rem;
      font-weight: normal;
    }
  }
}
</style>
