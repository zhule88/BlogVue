<script setup lang="ts">
import { defineProps } from 'vue';
import {
  useArticleTag,
  useTag
} from "@/stores";
import { onMounted} from "vue";
const articletagS = useArticleTag();
const tagS = useTag();
const props = defineProps<{
 id:number
}>();

onMounted(() => {
  articletagS.get(props.id)
})
</script>

<template>
  <div>
    <el-tag type="primary" v-for="item in articletagS.list"  >
          {{ tagS.nameGet(item) }}
        </el-tag -->
  </div>
</template>


<style scoped>

</style>
