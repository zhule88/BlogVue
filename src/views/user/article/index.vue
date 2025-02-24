<script setup lang="ts">
import showcase from "./showcase.vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const commentListS = useCommentList();
const articleS = useArticle();
const route = useRoute();
const router = useRouter();
const id = "article";

const themeS = useTheme();
const articleListS = reactive(new ArticleList());
const env = import.meta.env;
const scrollElement = document.documentElement;

onMounted(() => {
  init();
});
watch(route, () => {
  init();
});
const init = async () => {
  commentListS.parentList.length = 0;
  const articleId = route.params.id as any;
  await articleS.init(articleId);
  if (articleS.item.state == 0) {
    router.back();
  }
  useTitle(articleS.item.title);
  articleListS.around(articleId);
  window.scrollTo(0, 0);
};
</script>
<template>
  <showcase></showcase>
  <Layout two>
    <template #main>
      <card style="display: flex; flex-direction: column">
        <MdPreview
          :editorId="id"
          v-model="articleS.item.content"
          :theme="themeS.isdark ? 'dark' : 'light'"
          style="border-radius: 10px"
        />

        <div class="copyright">
          <div>
            <strong>本文作者：筑乐</strong>
          </div>
          <div>
            <strong>本文链接： </strong>
            <a :href="env.VITE_FRONTEND_URL + route.path">
              http://47.97.100.212:80{{ route.path }}</a
            >
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
        <div class="around">
          <div
            v-if="articleListS.list[0]"
            @click="router.push(`/user/article/${articleListS.list[0].id}`)"
          >
            <div class="text" style="left: 2rem">
              <div style="font-size: 15px; margin: 10px">上一篇</div>
              <div style="font-size: 20px; margin: 10px">
                {{ articleListS.list[0].title }}
              </div>
            </div>
            <el-image :src="articleListS.list[0].image" />
          </div>
          <div
            v-if="articleListS.list[1]"
            @click="router.push(`/user/article/${articleListS.list[1].id}`)"
          >
            <div class="text" style="right: 2rem">
              <div
                style="
                  font-size: 15px;
                  margin: 10px;
                  display: flex;
                  justify-content: flex-end;
                "
              >
                下一篇
              </div>
              <div
                style="
                  font-size: 20px;
                  margin: 10px;
                  display: flex;
                  justify-content: flex-end;
                "
              >
                {{ articleListS.list[1].title }}
              </div>
            </div>
            <el-image :src="articleListS.list[1].image" />
          </div>
        </div>
        <CommentArea
          :articleId="articleS.item.id!"
          v-if="articleS.item.id"
          style="width: 90%; margin: 20px auto"
        ></CommentArea>
      </card>
    </template>
    <template #sidebar>
      <infoCard></infoCard>
      <notice></notice>
      <SideCard title="目录" icon="目录" class="directory">
        <MdCatalog :editorId="id" :scrollElement="scrollElement" />
      </SideCard>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
.copyright {
  width: 90%;
  border-radius: 0.625rem;
  border: 1px dashed black;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
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
:deep(.md-editor-preview-wrapper) {
  background: var(--color-card);
}

:deep(.md-editor-preview) {
  font-family: cartoon;
  h2:hover,
  h1:hover,
  h3:hover {
    color: $sky-blue;
  }
}
.around {
  margin: $margin auto;
  width: 90%;
  height: 150px;
  display: flex;
  & > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    @extend center;
    position: relative;
    .text {
      position: absolute;
      top: 30%;
      color: #fff;
      z-index: 10;
    }
    &:hover {
      .el-image {
        filter: brightness(80%);
        transform: scale(1.1);
      }
    }
    & > .el-image {
      width: 100%;
      transition: transform 0.5s;
      filter: brightness(50%);
    }
  }
}
</style>
