<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { articlePage } from "@/api/article";
onMounted(() => {
  articlePage(1, 5).then((res) => {
    console.log(res.data.data);
  });
});

const id = "preview-only";
const text = ref<string>();
</script>

<template>
  <div>
    <el-input type="textarea" v-model="text" />
    <MdPreview :editorId="id" :modelValue="text" theme="light" />
  </div>
</template>

<style scoped></style>
