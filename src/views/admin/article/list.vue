<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useArticleList, useArticle, useCategoryList, useFile } from "@/stores";

const categoryListS = useCategoryList();
const articleListS = useArticleList();
const articleS = useArticle();
const fileS = useFile();

const dialogVisible = ref(false);
const rowdata = ref({
  id: 0,
  image: "",
});
onMounted(() => {
  categoryListS.mapGet();
  articleListS.state = 3;
  articleListS.get();
  fileS.articleId = rowdata.value.id;
});

const articleDel = () => {
  articleS.del(rowdata.value.id);
  fileS.del(rowdata.value.image.substring(30, 70));
  fileS.articleId = rowdata.value.id;
  fileS.delall();
  dialogVisible.value = false;
  articleListS.get();
};
</script>

<template>
  <el-table :data="articleListS.data" stripe>
    <el-table-column prop="id" label="id" />
    <el-table-column prop="title" label="标题" />
    <el-table-column label="封面">
      <template #default="scope">
        <img :src="scope.row.image" style="width: 60%" />
      </template>
    </el-table-column>
    <el-table-column label="分类">
      <template #default="scope">
        <p>{{ categoryListS.nameGet(scope.row.categoryId) }}</p>
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
