<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import { imageDelete } from "@/api/";
import { useRoute, useRouter } from "vue-router";
import { useCategoryList, useArticle } from "@/stores";
import { articleUpload } from "@/api";
import { AxiosRequestConfig } from "axios";
const categoryListS = useCategoryList();
const articleS = useArticle();
const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();
const isupload = ref(false);
const url = ref("../../../../public/image/article/");
const fileList = ref([]);
onMounted(async () => {
  categoryListS.get();
  if (!isNaN(route.query.id as any)) {
    articleS.get(route.query.id as any);
  }
});
const tablesubmit = async () => {
  if (fileList.value.length == 0) {
    uploadRef.value!.submit();
  }
  articleS.data.top = (articleS.data.top as unknown) == true ? 1 : 0;
  while (isupload.value) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (articleS.data.id == 0) {
    articleS.add();
  } else {
    const cp = articleS.data.image;
    articleS.update();
    if (cp != articleS.data.image) {
      imageDelete(cp);
    }
  }
  uploadRef.value!.clearFiles();
  articleS.clear();
};
const onUploadImg = async (file: AxiosRequestConfig<any> | undefined) => {
  const res = await articleUpload(file);
  url.value = url.value + res.data;
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
        action="http://localhost:8000/image/cover/upload"
        :auto-upload="false"
        :limit="1"
        @click="isupload = true"
        :file-list="fileList"
        :on-success="(res:any)=>{
          articleS.data.image = res.data;
          isupload = false;
    }"
      >
        <template #trigger>
          <el-button type="primary">选择封面</el-button>
        </template>
      </el-upload>
      <el-select
        v-model="articleS.data.categoryId"
        placeholder="Select"
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
      <div>
        是否置顶:
        <el-switch v-model="articleS.data.top" />
      </div>
      <div
        style="margin-left: auto"
        v-if="articleS.data.id == 0 || articleS.data.state == 0"
      >
        <el-button type="primary" @click="tablesubmit()">保存草稿</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              articleS.data.state = 2;
              tablesubmit();
            }
          "
          >发布</el-button
        >
      </div>
      <div style="margin-left: auto" v-else>
        <el-button type="primary" @click="router.back()">取消</el-button>
        <el-button type="primary" @click="tablesubmit()">修改</el-button>
      </div>
    </div>
    <MdEditor
      v-model="articleS.data.content"
      style="bottom: 0; position: relative; height: 100%"
    />
  </div>
</template>

<style scoped></style>
