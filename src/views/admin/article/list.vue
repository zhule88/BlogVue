<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { articleList, articleDelete, imageDelete } from "@/api/article";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const state: Ref = ref(3);
const dialogVisible = ref(false);
const tableData = ref([]);
const rowdata = ref({
  id: 0,
  image: "",
});
onMounted(() => {
  articlelist();
  ElMessage.success("因为几乎只有自己会看，所以一切从简了。面向自己编程");
});
const articlelist = async () => {
  await articleList(state.value).then((res) => {
    tableData.value = res.data;
  });
};

const articleDel = async () => {
  await articleDelete(rowdata.value.id);
  await imageDelete(rowdata.value.image);
  dialogVisible.value = false;
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
        <el-button
          size="small"
          type="danger"
          @click="
            () => {
              dialogVisible = true;
              rowdata.id = scope.row.id;
              rowdata.image = scope.row.image;
            }
          "
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="提示" width="500">
    <span>确认删除</span>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="articleDel()"> 确认 </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
