<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import {
  useCategoryList,
  useArticle,
  useTag,
  useFile,
  useArticleTag,
} from "@/stores";
import { useClipboard } from "@vueuse/core";

import type { file } from "@/types";

const categoryListS = useCategoryList();
const articleS = useArticle();
const tagS = useTag();
const articletagS = useArticleTag();
const fileS = useFile();
const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();
const filelist = ref<file[]>([]);
const filename = ref("");
const { copy } = useClipboard();

onMounted(async () => {
  await tagS.mapGet();
  categoryListS.list();
  if (!isNaN(route.query.id as any)) {
    await articleS.get(route.query.id as any);
    fileS.articleId = route.query.id as any;
    fileS.list();
  }
});

const tablesubmit = async () => {
  articleS.data.top = (articleS.data.top as unknown) == true ? 1 : 0;
  /* 封面延迟提交的废案  await new Promise((resolve) => setTimeout(resolve, 1000)); */
  if (articleS.data.id == undefined) {
    articleS.add();
  } else {
    articleS.update();
  }
  articletagS.add(articleS.data.id as any);
  uploadRef.value!.clearFiles();
  articleS.clear();
};
const onUploadImg = async (file: any) => {
  const res = await fileS.upload(file[0]);
  const R = "<img src='" + res.data + "'>";
  copy(R);
  fileS.list();
};
const tagClose = (tagId: number) => {
  articletagS.list = articletagS.list.filter((obj) => obj !== tagId);
};
</script>

<template>
  <div style="height: 100vh">
    <div style="display: flex; height: 40px">
      <el-input
        v-model="articleS.data.title"
        placeholder="标题"
        clearable
        style="width: 100px"
      />
      <el-upload
        ref="uploadRef"
        action="http://localhost:8000/file/add"
        :limit="1"
        :on-success="(res:any) =>{
          if(articleS.data.image != ''){
          fileS.del(articleS.data.image);
          }
          articleS.data.image = res.data;
    }"
      >
        <template #trigger>
          <el-button type="primary" style="height: 40px">选择封面</el-button>
        </template>
      </el-upload>
      <div v-if="articleS.data.id != undefined">
        <el-select v-model="filename" placeholder="删除文件" size="large">
          <el-option
            v-for="item in filelist"
            :label="item.filename"
            :value="item.filename"
          />
        </el-select>
        <el-button
          type="primary"
          @click="
            () => {
              fileS.del(filename);
              fileS.list();
            }
          "
          >删除</el-button
        >
      </div>
      <el-select
        v-model="articleS.data.categoryId"
        placeholder="选择分类"
        size="large"
      >
        <el-option
          v-for="item in categoryListS.data"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="articletagS.list"
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
            v-for="item in articletagS.list"
            :key="item"
            closable
            @close="tagClose(item)"
          >
            {{ tagS.nameGet(item) }}
          </el-tag>
        </template>
      </el-select>
      <el-select
        v-model="articleS.data.state"
        placeholder="选择状态"
        size="large"
      >
        <el-option v-for="item in 3" :label="item - 1" :value="item - 1" />
      </el-select>
      <div style="display: flex; justify-content: center; align-items: center">
        是否置顶:
        <el-switch v-model="articleS.data.top" />
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
      v-if="articleS.data.id != undefined"
      v-model="articleS.data.content"
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
