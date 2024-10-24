<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import { articleAdd, articleUpdate, articleGet } from "@/api/article";
import { useRoute, useRouter } from "vue-router";
const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();
const tableData = ref({
  id: 0,
  title: "",
  image: "",
  content: "",
  state: 0,
  top: 0,
});
const isTop = ref(false);
const submitUpload = () => {
  uploadRef.value!.submit();
};
onMounted(async () => {
  if (!isNaN(route.query.id)) {
    const res = await articleGet(route.query.id);
    tableData.value = res.data;
    isTop.value = tableData.value.top == 1 ? true : false;
  }
});
const articleadd = async () => {
  submitUpload();
  tableData.value.top = isTop.value ? 1 : 0;
  while (tableData.value.image == "") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (tableData.value.id == 0) {
    await articleAdd(tableData.value);
  } else {
    await await articleUpdate(tableData.value);
  }
  tableData.value = {
    id: 0,
    title: "",
    image: "",
    content: "",
    state: 0,
    top: 0,
  };
  uploadRef.value!.clearFiles();
};
</script>
<template>
  <div>
    <div style="display: flex">
      <el-input
        v-model="tableData.title"
        placeholder="标题"
        clearable
        style="height: 40px; width: 200px"
      />
      <el-upload
        ref="uploadRef"
        action="http://localhost:8000/cover/upload"
        :auto-upload="false"
        :limit="1"
        :on-success="(res:any)=>{
          tableData.image = res.data;
    }"
      >
        <template #trigger>
          <el-button type="primary">选择封面</el-button>
        </template>
      </el-upload>

      <div>
        是否置顶:
        <el-switch v-model="isTop" />
      </div>

      <div style="margin-left: auto" v-if="tableData.id == 0">
        <el-button type="primary" @click="articleadd()">保存草稿</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              tableData.state = 2;
              articleadd();
            }
          "
          >发布</el-button
        >
      </div>
      <div style="margin-left: auto" v-else>
        <el-button type="primary" @click="router.back()">取消</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              tableData.state = 2;
              articleadd();
            }
          "
          >修改</el-button
        >
      </div>
    </div>
    <MdEditor
      v-model="tableData.content"
      style="bottom: 0; position: absolute"
    />
  </div>
</template>

<style scoped></style>
