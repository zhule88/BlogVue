<script setup lang="ts">
import { ArticleTag } from "@/service";
import { onMounted } from "vue";
import type { Tag } from "@/service/index";
import color from "@/utils/color";

const articletagS = new ArticleTag();
const colorI = new color();
const props = defineProps<{
  id: number | undefined;
  tagS: Tag;
}>();
onMounted(() => {
  articletagS.init(props.id!);
});
</script>

<template>
  <div>
    <el-tag v-for="item in articletagS.list.value">
      {{ tagS.map.get(item) }}
    </el-tag>
  </div>
</template>

<!-- :color="colorI.random()"
effect="light" -->
<style scoped></style>
