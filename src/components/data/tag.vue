<script setup lang="ts">
const tagS = useTag();
const articletagS = new ArticleTag();

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
