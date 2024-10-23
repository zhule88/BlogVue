<script setup lang="ts">
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const text = ref("# Hello Editor");
</script>
<template>
  <img
    src="C:\Users\zhule\Desktop\image\be1fb2f40ac0199bf6dd126360f982c5.jpg"
  />
  <MdEditor v-model="text" />
</template>

<style scoped></style>
