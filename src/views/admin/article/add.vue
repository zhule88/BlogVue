<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import { imageDelete } from "@/api/";
import { useRoute, useRouter } from "vue-router";
import { useCategoryList, useArticle } from "@/stores";
import { articleUpload } from "@/api";
import { init, mkdirChange, newIdGet, list } from "@/api";
import { useClipboard } from "@vueuse/core";

const categoryListS = useCategoryList();

const articleS = useArticle();
const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();
const url = ref('<img src="../../../../public/image/article/stage/');
const fileList = ref([]);
const imgNameList = ref([]);
const imgName = ref("");
const { copy } = useClipboard();
onMounted(async () => {
  init();
  categoryListS.get();
  if (!isNaN(route.query.id as any)) {
    await articleS.get(route.query.id as any);
    imgNameList.value = (await list(articleS.data.id)).data;
  }
});
const tablesubmit = async () => {
  articleS.data.top = (articleS.data.top as unknown) == true ? 1 : 0;
  /* 封面延迟提交的废案  await new Promise((resolve) => setTimeout(resolve, 1000)); */
  if (articleS.data.id == undefined) {
    await articleS.add();
    const res = await newIdGet();
    mkdirChange(res.data);
  } else {
    articleS.update();
  }
  uploadRef.value!.clearFiles();
  articleS.clear();
};
const onUploadImg = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file[0]);
  if (articleS.data.id == undefined) {
    const res = await articleUpload(formData);
    url.value = url.value + res.data + ">";
  } else {
    const res = await articleUpload(formData, articleS.data.id);
    url.value = url.value + res.data + '">';
  }
  imgNameList.value = (await list(articleS.data.id)).data;
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
        :limit="1"
        :file-list="fileList"
        :on-success="(res:any)=>{
          articleS.data.image = res.data;
    }"
      >
        <template #trigger>
          <el-button type="primary">选择封面</el-button>
        </template>
      </el-upload>
      <el-button type="primary" @click="copy(url)"> 复制图片</el-button>
      <div v-if="articleS.data.id != undefined">
        <el-select
          v-model="imgName"
          placeholder="删除图片"
          size="large"
          style="width: 240px"
        >
          <el-option v-for="item in imgNameList" :label="item" :value="item" />
        </el-select>
        <el-button
          type="primary"
          @click="
            imageDelete(imgName, articleS.data.id).then(() => {
              list(articleS.data.id).then((res) => {
                imgNameList = res.data;
              });
            })
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
      <div>
        是否置顶:
        <el-switch v-model="articleS.data.top" />
      </div>

      <div
        style="margin-left: auto"
        v-if="articleS.data.id == undefined || articleS.data.state == 0"
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
      :onUploadImg="onUploadImg"
    />
  </div>
</template>

<style scoped></style>
