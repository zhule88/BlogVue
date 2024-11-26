<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { Article, File, ArticleTag } from "@/service";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
import { useTag, useCategoryList } from "@/stores";

const tagS = useTag();
const categoryListS = useCategoryList();
const articleS = new Article();
const fileS = new File();
const articletagS = new ArticleTag();

const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();

const { copy } = useClipboard();

onMounted(async () => {
  clear();
  const articleId = route.params.id as any;
  if (!isNaN(articleId)) {
    articleS.init(articleId);
    articletagS.init(articleId);
    fileS.init(articleId);
  }
});

const tablesubmit = async () => {
  articleS.item.value.top = articleS.item.value.top == true ? 1 : 0;
  ElMessage.success("保存成功");
  if (articleS.item.value.id == undefined) {
    articleS.add();
    router.back();
  } else {
    articleS.update();
  }
  articletagS.update(articleS.item.value.id!);
};

const onUploadImg = async (file: any) => {
  const res = await fileS.upload(file[0]);
  const R = "<img src='" + res.data + "'>";
  copy(R);
  fileS.init();
};
const tagClose = (tagId: number) => {
  articletagS.list.value = articletagS.list.value.filter(
    (obj) => obj !== tagId
  );
};
const clear = () => {
  articletagS.list.value = [];
  uploadRef.value!.clearFiles();
  articleS.clear();
};
</script>

<template>
  <div style="height: 100vh">
    <div style="display: flex; height: 40px">
      <el-input
        v-model="articleS.item.value.title"
        placeholder="标题"
        clearable
        style="width: 250px"
      />
      <el-upload
        ref="uploadRef"
        action="http://localhost:8000/file/add"
        :limit="1"
        :on-success="(res:any) =>{
          if(articleS.item.value.image != ''){
            fileS.filename.value = articleS.item.value.image;
          fileS.del();
          }
          articleS.item.value.image = res.data;
    }"
      >
        <template #trigger>
          <el-button type="primary" style="height: 40px">选择封面</el-button>
        </template>
      </el-upload>
      <div v-if="articleS.item.value.id != undefined">
        <el-select
          v-model="fileS.filename.value"
          placeholder="删除文件"
          size="large"
        >
          <el-option
            v-for="item in fileS.list.value"
            :label="item.filename"
            :value="item.filename"
          />
        </el-select>
        <el-button
          type="primary"
          @click="
            () => {
              fileS.del();
              fileS.init();
            }
          "
          >删除</el-button
        >
      </div>
      <el-select
        v-model="articleS.item.value.categoryId"
        placeholder="选择分类"
        size="large"
      >
        <el-option
          v-for="item in categoryListS.list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select
        v-model="articletagS.list.value"
        v-if="articleS.item.value.id != undefined"
        placeholder="选择标签"
        multiple
        size="large"
      >
        <el-option
          v-for="item in tagS.list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
        <template #tag>
          <el-tag
            v-for="item in articletagS.list.value"
            :key="item"
            closable
            @close="tagClose(item)"
          >
            {{ tagS.map.get(item) }}
          </el-tag>
        </template>
      </el-select>
      <el-select
        v-model="articleS.item.value.state"
        placeholder="选择状态"
        size="large"
      >
        <el-option v-for="item in 3" :label="item - 1" :value="item - 1" />
      </el-select>
      <div style="display: flex; justify-content: center; align-items: center">
        是否置顶:
        <el-switch v-model="articleS.item.value.top" />
      </div>

      <div style="margin-left: auto; height: 100%">
        <el-button type="primary" @click="router.back()" style="height: 100%"
          >取消</el-button
        >
        <el-button type="primary" @click="tablesubmit()" style="height: 100%"
          >保存</el-button
        >
      </div>
    </div>
    <MdEditor
      v-if="articleS.item.value.id != undefined"
      v-model="articleS.item.value.content"
      style="bottom: 0; position: relative; height: 100%"
      :onUploadImg="onUploadImg"
    />
  </div>
</template>

<style scoped>
.el-select {
  width: 200px;
}
</style>
