<script setup lang="ts">
import showcase from "./showcase.vue";
import { MdPreview } from "md-editor-v3";
import { MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useArticle } from "@/stores";

const articleS = useArticle();
const route = useRoute();
const id = "article";
const mode = useColorMode() as any;
const env = import.meta.env;
const scrollElement = document.documentElement;

onMounted(() => {
  const articleId = route.params.id as any;
  articleS.init(articleId);
});
</script>
<template>
  <showcase></showcase>
  <dualL>
    <template #main>
      <card>
        <MdPreview
          :editorId="id"
          v-model:model-value="articleS.item.content"
          :theme="mode"
          style="border-radius: 10px"
        />

        <div class="copyright">
          <div>
            <strong>本文作者：筑乐</strong>
          </div>
          <div>
            <strong>本文链接： </strong>
            <a :href="env.VITE_FRONTEND_URL + route.path">{{
              env.VITE_FRONTEND_URL + route.path
            }}</a>
          </div>
          <div>
            <strong>版权声明： </strong>
            本站所有文章除特别声明外，均采用 &nbsp;
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
              target="_blank"
            >
              CC BY-NC-SA 4.0
            </a>
            &nbsp; 许可协议。转载请注明文章出处！
          </div>
        </div>
      </card>
    </template>
    <template #sidebar>
      <infoCard></infoCard>
      <notice></notice>
      <SideCard title="目录" icon="目录" class="directory">
        <MdCatalog :editorId="id" :scrollElement="scrollElement" />
      </SideCard>
    </template>
  </dualL>
</template>

<style scoped lang="scss">
.copyright {
  width: 90%;
  border-radius: 0.625rem;
  border: 1px dashed black;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  margin: 4rem auto;
  & > div {
    font-size: 15px;
    margin: 10px;
    & > a {
      text-decoration: none;
      color: #a9a9a9;
      &:hover {
        text-decoration: underline;
        color: $sky-blue;
      }
    }
  }
}
.directory {
  position: sticky;
  top: 20px;
  padding: 10px;
}
:deep(.md-editor-catalog-active) {
  & > span {
    background: rgba(59, 130, 246, 0.1);
    color: $sky-blue;
    border-radius: $border-radius;
    font-weight: bold;
    padding: 0.5rem 0 0.5rem 0.5rem;
  }
}
:deep(.md-editor-catalog) {
  span:hover {
    color: $sky-blue;
  }
}
</style>
