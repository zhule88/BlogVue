<script setup lang="ts">
import { ArticleTag } from "@/service";
import { useTag } from "@/stores/modules/tag";
import color from "@/utils/color";

const tagS = useTag();
const articletagS = new ArticleTag();
const colorI = new color();
const props = defineProps<{
  id: number | undefined;
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

<style scoped></style>
