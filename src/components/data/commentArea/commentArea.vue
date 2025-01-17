<script setup lang="ts">
const commentS = reactive(new COmment());
const count = ref(0);
const prop = defineProps<{
  articleId: number;
}>();
onMounted(async () => {
  commentS.item.articleId = prop.articleId;
  await commentS.page();
  count.value = await commentS.count(prop.articleId);
});
const throttledFn = useThrottleFn(async () => {
  commentS.current++;
  await commentS.page();
}, 1000);
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
      (document.body.offsetHeight / 5) * 4 &&
    commentS.isMore
  ) {
    throttledFn();
  }
});
</script>
<template>
  <div>
    <reply-box :articleId="articleId!" @submit="commentS.page()"></reply-box>
    <div style="font-size: 30px; font-weight: 600; margin: 20px 0">
      留言 {{ count }}
    </div>
    <comment-card :articleId="articleId" :list="commentS.list"></comment-card>

    <div
      v-if="!commentS.isMore"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        padding: 20px 0;
        width: 100%;
      "
    >
      到底了~
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
