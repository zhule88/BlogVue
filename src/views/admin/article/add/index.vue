<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { File } from "@/service";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
import file from "./file.vue";

const tagS = useTag();
const categoryListS = useCategoryList();
const articleS = useArticle();

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  clear();
  const articleId = route.query.id as any;
  if (!isNaN(articleId)) {
    articleS.init(articleId);
  }
});

const tablesubmit = async () => {
  articleS.item.top = articleS.item.top == true ? 1 : 0;
  ElMessage.success("保存成功");
  if (articleS.item.id == undefined) {
    articleS.add();
    router.back();
  } else {
    articleS.update();
  }
};

const tagClose = (tagId: number) => {
  articleS.item.tags = articleS.item.tags!.filter((obj) => obj !== tagId);
};
const clear = () => {
  articleS.clear();
};
</script>

<template>
  <div style="height: 100vh">
    <div style="display: flex; height: 40px; width: 100%">
      <el-input
        v-model="articleS.item.title"
        placeholder="标题"
        clearable
        style="width: 100px"
      />
      <file></file>
      <el-select
        v-model="articleS.item.categoryId"
        placeholder="选择分类"
        size="large"
      >
        <el-option
          v-for="item in categoryListS.list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-if="articleS.item.id != undefined"
        v-model="articleS.item.tags"
        placeholder="选择标签"
        multiple
        size="large"
      >
        <el-option
          v-for="item in tagS.list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
        <template #tag>
          <el-tag
            v-for="item in articleS.item.tags"
            :key="item"
            closable
            @close="tagClose(item)"
          >
            {{ tagS.map.get(item) }}
          </el-tag>
        </template>
      </el-select>
      <el-select
        v-model="articleS.item.state"
        placeholder="选择状态"
        size="large"
      >
        <el-option v-for="item in 3" :label="item - 1" :value="item - 1" />
      </el-select>
      <div style="display: flex; justify-content: center; align-items: center">
        是否置顶:
        <el-switch v-model="articleS.item.top" />
      </div>
      <el-button type="primary" @click="tablesubmit()" style="height: 100%"
        >保存</el-button
      >
      <el-button type="primary" @click="router.back()" style="height: 100%"
        >取消</el-button
      >
    </div>
    <MdEditor
      v-if="articleS.item.id != undefined"
      v-model="articleS.item.content"
      style="bottom: 0; position: relative; height: 100%"
    />
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 200px;
}
</style>
