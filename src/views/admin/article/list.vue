<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { articleList, articleDelete } from "@/api/article";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { S } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
const state: Ref = ref(3);
const tableData = ref([]);
onMounted(() => {
  articlelist();
  ElMessage.success("因为几乎只有自己会看，所以一切从简了。面向自己编程");
});
const articlelist = async () => {
  await articleList(state.value).then((res) => {
    tableData.value = res.data;
  });
};
const articleDel = async (id: number) => {
  await articleDelete(id);
  articlelist();
};
const imgGet = (img: string) => {
  const bef = "../../../../public/image/";
  return bef + img;
};
</script>

<template>
  <el-table :data="tableData" stripe>
    <el-table-column prop="title" label="标题" />
    <el-table-column label="封面">
      <template #default="scope">
        <img :src="imgGet(scope.row.image)" style="width: 50%" />
      </template>
    </el-table-column>
    <el-table-column prop="state" label="状态" />
    <el-table-column prop="visitCount" label="浏览量" />
    <el-table-column prop="top" label="是否置顶" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <router-link :to="`/admin/add?id=${scope.row.id}`">
          <el-button size="small" type="primary"> 修改 </el-button>
        </router-link>
        <el-button size="small" type="danger" @click="articleDel(scope.row.id)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
