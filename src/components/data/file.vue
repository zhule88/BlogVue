<script setup lang="ts">
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
const props = defineProps<{
  title: string;
  image?: boolean;
}>();
const emit = defineEmits(["confirm"]);
const reader = new FileReader();
const dialogVisible = ref(false);
const isShow = ref(true);
const file = ref<globalThis.File>();
const input = ref<HTMLInputElement>();
const image = ref<string>();
const imageType = ["image/jpeg", "image/webp", "image/png", "image/gif"];
let allowe = [...imageType, "video/mp4", "audio/mpeg", "audio/ogg"];

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
  if (props.image) {
    allowe = imageType;
  }
  if (allowe.includes(f.type)) {
    file.value = f;
    if (imageType.includes(f.type)) {
      reader.readAsDataURL(file.value);
    }
    isShow.value = false;
  } else {
    ElMessage.error("格式错误");
  }
};
const confirm = async () => {
  dialogVisible.value = false;
  emit("confirm", file.value);
};
</script>
<template>
  <el-button
    type="primary"
    style="height: 100%"
    @click="
      isShow = true;
      dialogVisible = true;
    "
    >{{ title }}</el-button
  >
  <el-dialog v-model="dialogVisible" :title="title" width="600">
    <div class="contain">
      <div
        v-show="isShow"
        @paste="paste"
        @dragenter.prevent
        @dragover.prevent
        @drop="drop"
        @click="input?.click()"
        class="upload"
        @mouseover.stop=""
        :close-on-click-modal="false"
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
      <div class="upload" v-show="!isShow">
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
        <div v-show="!image">视频/音频已接收</div>
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
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.5s;
  &:hover {
    filter: brightness(90%);
  }
  .upload {
    @extend center;
    @extend full;
    overflow: hidden;
  }
}
</style>
