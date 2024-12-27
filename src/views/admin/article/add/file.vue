<script setup lang="ts">
import { File } from "@/service";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
const { copy } = useClipboard();
const fileS = reactive(new File());
const reader = new FileReader();
const articleS = useArticle();
const dialogVisible = ref(false);

const isShow = ref(true);
const isCover = ref(false);
const file = ref<globalThis.File>();
const input = ref<HTMLInputElement>();
const image = ref<string>();
const allowe = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "audio/mpeg",
  "audio/ogg",
];
const imageType = ["image/jpeg", "image/webp", "image/png", "image/gif"];
watch(
  () => articleS.item.id,
  (newId) => {
    if (newId) {
      fileS.init(newId);
    }
  }
);
reader.onload = (e) => {
  image.value = e.target!.result as string;
};
const paste = async (e: ClipboardEvent) => {
  fileHandle(e.clipboardData!.items[0].getAsFile()!);
};
const drop = (e: DragEvent) => {
  e.preventDefault();
  fileHandle(e.dataTransfer?.files[0]!);
};
const click = (e: any) => {
  fileHandle(e.target?.files[0]);
};
const fileHandle = (f: globalThis.File) => {
  if (allowe.includes(f.type)) {
    file.value = f;
    if (imageType.includes(f.type)) {
      reader.readAsDataURL(file.value);
    }
    isShow.value = false;
  } else {
    ElMessage.error("只支持视频，图片，音频格式的文件");
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
    :title="isCover == true ? '上传封面' : '上传文件'"
    width="600"
  >
    <div class="contain">
      <div
        v-show="isShow"
        @paste="paste"
        @dragenter.prevent
        @dragover.prevent
        @drop="drop"
        @click="input?.click()"
        class="upload"
        @mouseover.stop="ElMessage.success('进入文件上传区域,可以粘贴或释放')"
      >
        支持点击，拖拽，粘贴上传
      </div>
      <input
        type="file"
        id="fileInput"
        @change="click"
        ref="input"
        style="display: none"
        accept="*"
      />
      <div class="display" v-show="!isShow">
        <img
          v-show="image"
          :src="image"
          alt="预览图片"
          style="
            width: 100%;
            height: 100%;
            object-position: center;
            object-fit: cover;
          "
        />
        <div v-show="!image">视频/音频已上传</div>
      </div>
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
.contain {
  width: 400px;
  height: 250px;
  margin: 0 auto;
  border: 2px dashed #ccc;
  @extend center;
  color: #ccc;
  padding: 10px;
  box-sizing: border-box;
  .upload {
    @extend center;
    @extend full;
  }
  .display {
    @extend center;
    @extend full;
    overflow: hidden;
  }
}
</style>
