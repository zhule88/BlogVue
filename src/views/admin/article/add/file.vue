<script setup lang="ts">
import { File } from "@/service";

const { copy } = useClipboard();
const fileS = reactive(new File());
const reader = new FileReader();
const articleS = useArticle();
const dialogVisible = ref(false);
const isShow = ref(true);
const isCover = ref(false);
const file = ref();
const image = ref();

watch(
  () => articleS.item.id,
  (newId) => {
    if (newId) {
      fileS.init(newId);
    }
  }
);
reader.onload = (e) => {
  image.value = e.target!.result;
};
const paste = async (e: ClipboardEvent) => {
  const items = e.clipboardData!.items;
  for (const item of items) {
    if (item.type.startsWith("image/")) {
      file.value = item.getAsFile();
      reader.readAsDataURL(file.value);
      isShow.value = false;
      break;
    }
  }
};
const confirm = async () => {
  dialogVisible.value = false;
  if (isCover.value) {
    const res = await fileS.upload(file.value);
    articleS.item.image = res.data;
  } else {
    const res = await fileS.upload(file.value, articleS.item.id);
    copy("<img src='" + prefix + res.data + "'>");
    fileS.init(articleS.item.id!);
  }
};
</script>
<template>
  <el-button type="primary" style="height: 100%" @click="isCover = !isCover"
    >切换</el-button
  >
  <el-button
    type="primary"
    style="height: 100%"
    @click="
      isShow = true;
      dialogVisible = true;
    "
    >{{ isCover == true ? "上传封面" : "上传图片" }}</el-button
  >
  <el-select
    v-if="articleS.item.id != undefined"
    v-model="fileS.filename"
    style="width: 100px"
    placeholder="删除文件"
    size="large"
  >
    <el-option
      v-for="item in fileS.list"
      :label="item.filename"
      :value="item.filename"
    />
  </el-select>
  <el-button
    type="primary"
    style="height: 100%"
    v-if="articleS.item.id != undefined"
    @click="
      () => {
        fileS.del();
        fileS.init(articleS.item.id!);
      }
    "
    >删除</el-button
  >
  <el-dialog
    v-model="dialogVisible"
    :title="isCover == true ? '上传封面' : '上传图片'"
    width="600"
  >
    <div class="pastezone">
      <div v-show="isShow" @paste="paste">在这里粘贴图片</div>
      <img
        v-show="!isShow"
        :src="image"
        alt="预览图片"
        style="width: 100%; height: 100%"
      />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm()"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.pastezone {
  width: 400px;
  height: 250px;
  margin: 0 auto;
  border: 2px dashed #ccc;
  @extend center;
  color: #ccc;
  padding: 10px;
  box-sizing: border-box;
}
</style>
