<script setup lang="ts">
import { ArticleTag } from "@/service";
import { onMounted } from "vue";
import type { Tag } from "@/service/index";

const articletagS = new ArticleTag();
const props = defineProps<{
  id: number | undefined;
  tagS: Tag;
}>();
onMounted(async () => {
  articletagS.init(props.id!);
});
</script>

<template>
  <div>
    <el-tag type="primary" v-for="item in articletagS.list.value">
      {{ tagS.map.get(item) }}
    </el-tag>
  </div>
</template>

<style scoped></style>
