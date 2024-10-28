<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { UploadInstance } from "element-plus";
import category from "@/types/category";
import {
  articleAdd,
  articleUpdate,
  articleGet,
  imageDelete,
} from "@/api/article";
import { categoryList } from "@/api/category";
import { useRoute, useRouter } from "vue-router";
import { useCategoryList } from "@/stores/modules/category";
const categoryListS = useCategoryList();
const uploadRef = ref<UploadInstance>();
const route = useRoute();
const router = useRouter();
const isupload = ref(false);
const categoryNums = ref<category[]>([]);
const tableData = ref({
  id: 0,
  category_id: 1,
  title: "",
  image: "",
  content: "",
  state: 0,
  top: 0,
});
const isTop = ref(false);
onMounted(async () => {
  categoryNums.value = (await categoryList()).data;
  categoryListS.get();
  if (!isNaN(route.query.id as any)) {
    const res = await articleGet(route.query.id as any);
    tableData.value = res.data;
    isTop.value = tableData.value.top == 1 ? true : false;
  }
});
const tablesubmit = async () => {
  if (tableData.value.image == "") {
    uploadRef.value!.submit();
  } else {
  }
  tableData.value.top = isTop.value ? 1 : 0;
  while (isupload.value) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (tableData.value.id == 0) {
    await articleAdd(tableData.value);
  } else {
    await articleUpdate(tableData.value);
  }
  tableData.value = {
    id: 0,
    category_id: 0,
    title: "",
    image: "",
    content: "",
    state: 0,
    top: 0,
  };
  isTop.value = false;
  uploadRef.value!.clearFiles();
};
</script>
<template>
  <div style="height: 100vh">
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
        @click="isupload = true"
        :on-success="(res:any)=>{
          tableData.image = res.data;
          isupload = false;
    }"
      >
        <template #trigger>
          <el-button type="primary">选择封面</el-button>
        </template>
      </el-upload>
      <el-select
        v-model="tableData.category_id"
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
        <el-switch v-model="isTop" />
      </div>

      <div
        style="margin-left: auto"
        v-if="tableData.id == 0 || tableData.state == 0"
      >
        <el-button type="primary" @click="tablesubmit()">保存草稿</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              tableData.state = 2;
              tablesubmit();
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
            async () => {
              const cp = tableData.image;
              await tablesubmit();
              if (cp != tableData.image) {
                await imageDelete(cp);
              }
            }
          "
          >修改</el-button
        >
      </div>
    </div>
    <MdEditor
      v-model="tableData.content"
      style="bottom: 0; position: relative; height: 100%"
    />
  </div>
</template>

<style scoped></style>
