<script setup lang="ts">
import { useTag, useCategoryList } from "@/stores";
const tagS = useTag();
const categoryListS = useCategoryList();
onMounted(() => {
  tagS.init();
  categoryListS.init();
});
</script>
<template>
  <!-- <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <h1>加载中...</h1>
    </template>
  </Suspense> -->
  <RouterView />
</template>

<style scoped></style>
