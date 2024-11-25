<script setup lang="ts">
import { Article, File, ArticleTag, ArticleList } from "@/service";
import { useTag, useCategoryList } from "@/stores";

const tagS = useTag();
const categoryListS = useCategoryList();
const articleListS = new ArticleList();
const articleS = new Article();
const fileS = new File();
const articletagS = new ArticleTag();

const dialogVisible = ref(false);

onMounted(() => {
  articleListS.state.value = 3;
  articleListS.init();
});

const articleDel = async () => {
  await articleS.del();
  const article = articleS.item.value;
  fileS.del(article.image.substring(30, 70));
  fileS.delAll(article.id);
  articletagS.update(article.id!);
  dialogVisible.value = false;
  articleListS.init();
};
</script>

<template>
  <el-table :data="articleListS.list.value" stripe>
    <el-table-column prop="id" label="id" />
    <el-table-column prop="title" label="标题" />
    <el-table-column label="封面">
      <template #default="scope">
        <img :src="scope.row.image" style="width: 60%" />
      </template>
    </el-table-column>
    <el-table-column label="分类">
      <template #default="scope">
        <p>{{ categoryListS.map.get(scope.row.categoryId) }}</p>
      </template>
    </el-table-column>
    <el-table-column label="标签">
      <template #default="scope">
        <tag v-model:id="scope.row.id" v-model:tagS="tagS"></tag>
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
              articleS.item.value.id = scope.row.id;
              articleS.item.value.image = scope.row.image;
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
