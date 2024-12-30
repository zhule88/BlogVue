<script setup lang="ts">
const themeS = useTheme();
defineProps<{
  tag?: boolean;
  button?: boolean;
  large?: boolean;
  Style?: Record<string, string | number>;
}>();
</script>
<template>
  <div>
    <el-tag :type="themeS.isdark ? 'info' : 'primary'" v-if="tag">
      <slot></slot
    ></el-tag>

    <el-button
      :color="themeS.isdark ? '#2f2f2f' : '#3b82f6'"
      :size="large ? 'large' : 'default'"
      :style="Style"
      v-if="button"
    >
      <slot></slot
    ></el-button>
  </div>
</template>

<style scoped></style>
