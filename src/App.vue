<script setup lang="ts">
const tagS = useTag();
const categoryListS = useCategoryList();
const userS = useUser();
const themeS = useTheme();
onMounted(() => {
  tagS.init();
  categoryListS.init();
  userS.info();
  document.documentElement.classList.toggle("dark", themeS.isdark);
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
