<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { useCategoryList, useArticle } from "@/stores";
import { useClipboard } from "@vueuse/core";
import { fileList, fileUpload, fileDel } from "@/api";
import type { file } from "@/types";

const categoryListS = useCategoryList();
const articleS = useArticle();
const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();
const filelist = ref<file[]>([]);

const filename = ref("");
const { copy } = useClipboard();
onMounted(async () => {
  categoryListS.get();
  if (!isNaN(route.query.id as any)) {
    await articleS.get(route.query.id as any);
    filelistGet();
  }
});

const filelistGet = async () => {
  const res = await fileList(articleS.data.id);
  console.log(res);
  filelist.value = res.data;
};

const tablesubmit = async () => {
  articleS.data.top = (articleS.data.top as unknown) == true ? 1 : 0;
  /* 封面延迟提交的废案  await new Promise((resolve) => setTimeout(resolve, 1000)); */
  if (articleS.data.id == undefined) {
    await articleS.add();
  } else {
    articleS.update();
  }
  uploadRef.value!.clearFiles();
  articleS.clear();
};
const onUploadImg = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file[0]);
  const res = await fileUpload(formData, articleS.data.id);
  console.log(res.data);
  copy(res.data);
  filelistGet();
};
</script>

<template>
  <div style="height: 100vh">
    <div style="display: flex">
      <el-input
        v-model="articleS.data.title"
        placeholder="标题"
        clearable
        style="height: 40px; width: 200px"
      />
      <el-upload
        ref="uploadRef"
        action="http://localhost:8000/file/add"
        :limit="1"
        :on-success="(res:any) =>{
          if(articleS.data.image != ''){
            fileDel(articleS.data.image);
          }
          articleS.data.image = res.data;
    }"
      >
        <template #trigger>
          <el-button type="primary">选择封面</el-button>
        </template>
      </el-upload>
      <div v-if="articleS.data.id != undefined">
        <el-select
          v-model="filename"
          placeholder="删除文件"
          size="large"
          style="width: 240px"
        >
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
              fileDel(filename);
              filelistGet();
            }
          "
          >删除</el-button
        >
      </div>
      <el-select
        v-model="articleS.data.categoryId"
        placeholder="选择分类"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in categoryListS.data"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="articleS.data.state"
        placeholder="选择状态"
        size="large"
        style="width: 240px"
      >
        <el-option v-for="item in 3" :label="item - 1" :value="item - 1" />
      </el-select>
      <div>
        是否置顶:
        <el-switch v-model="articleS.data.top" />
      </div>
      <div style="margin-left: auto">
        <el-button type="primary" @click="router.back()">取消</el-button>
        <el-button type="primary" @click="tablesubmit()">保存</el-button>
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

<style scoped></style>
