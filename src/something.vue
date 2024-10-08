<script setup lang="ts">
import { themeChange } from "theme-change";
import { onMounted } from "vue";
onMounted(() => {
  themeChange(false);
});
</script>
<template>
  <div>
    <button data-set-theme="dark" data-act-class="dark">明亮</button>
    <button data-set-theme="light" data-act-class="light">暗黑</button>
  </div>
</template>

<style scoped>
.light,
.dark {
  display: none;
}
</style>
