<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
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
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
