<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { articleList } from "@/api/article";
const state: Ref = ref(3);
const tableData = ref([]);
onMounted(() => {
  stateChange();
});
const stateChange = async () => {
  await articleList(state.value).then((res) => {
    tableData.value = res.data.data;
  });
};
</script>

<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="title" label="标题" width="100vw" />
  </el-table>
</template>

<style scoped></style>
