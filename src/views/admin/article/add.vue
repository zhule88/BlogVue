<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { File } from "@/service";
import file from "@/components/data/file.vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
const { copy } = useClipboard();
const fileS = reactive(new File());

const tagS = useTag();
const categoryListS = useCategoryList();
const articleS = useArticle();

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  articleS.clear();
  const articleId = route.query.id as any;
  if (!isNaN(articleId)) {
    await articleS.init(articleId);
    fileS.init(articleId);
  }
});

const fileUpload = async (f: globalThis.File) => {
  /*   if (f == undefined) {
    ElMessage.error("没有选择文件");
    return;
  } */
  await fileS.upload(f, articleS.item.id);
  const url = prefix + fileS.filename;
  if (["image/jpeg", "image/png", "image/gif", "image/webp"].includes(f.type)) {
    copy("<img src='" + url + "'>");
  } else if (f.type == "video/mp4") {
    copy(
      "<video width='100%' height='300px' controls><source src='" +
        url +
        "'  type='video/mp4'></video>"
    );
  } else {
    copy("<audio controls><source src='" + url + "' type='audio/aac'></audio>");
  }
};

const tablesubmit = async () => {
  articleS.item.top = articleS.item.top == true ? 1 : 0;
  if (articleS.item.id == undefined) {
    if (fileS.file) {
      await fileS.upload();
      articleS.item.image = fileS.filename;
    }
    articleS.add();
    router.back();
  } else {
    if (articleS.item.image.startsWith(prefix)) {
      articleS.item.image = articleS.item.image.slice(prefix.length);
    }
    if (fileS.file && articleS.item.image) {
      fileS.del(articleS.item.image);
      await fileS.upload();
      articleS.item.image = fileS.filename;
    }
    articleS.update();
  }
  ElMessage.success("保存成功");
};

const tagClose = (tagId: number) => {
  articleS.item.tags = articleS.item.tags!.filter((obj) => obj !== tagId);
};
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex; height: 40px; width: 100%">
      <el-input
        v-model="articleS.item.title"
        placeholder="标题"
        clearable
        style="width: 100px"
      />
      <file
        title="上传封面"
        image
        @confirm="
          (f) => {
            fileS.file = f;
          }
        "
      ></file>
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
        @click="fileS.del(), fileS.init(articleS.item.id!)"
        >删除</el-button
      >
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
        <el-option
          v-for="item in 2"
          :label="item - 1 == 0 ? '草稿' : '发布'"
          :value="item - 1"
        />
      </el-select>
      <div style="display: flex; justify-content: center; align-items: center">
        是否置顶:
        <el-switch v-model="articleS.item.top" />
      </div>

      <file title="上传文件" @confirm="fileUpload"> </file>
      <el-button @click="tablesubmit()" style="height: 100%">保存</el-button>
    </div>

    <MdEditor
      v-if="articleS.item.id != undefined"
      v-model="articleS.item.content"
      style="flex-grow: 1"
    />
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 200px;
}
</style>
