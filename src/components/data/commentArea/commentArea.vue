<script setup lang="ts">
const commentS = reactive(new COmment());
const commentListS = useCommentList();
const likeS = useLike();
const userS = useUser();
const prop = defineProps<{
  articleId: number;
}>();
onMounted(async () => {
  commentListS.parentList.length = 0;
  commentS.item.articleId = prop.articleId;
  commentListS.init(prop.articleId);
  commentListS.countGet(prop.articleId);
  if (userS.item.id) {
    likeS.user(userS.item.id);
  }
});

const throttledFn = useThrottleFn(async () => {
  commentListS.current++;
  commentListS.init(prop.articleId);
}, 1000);

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
      (document.body.offsetHeight / 5) * 4 &&
    commentListS.isMore
  ) {
    throttledFn();
  }
});
</script>
<template>
  <div>
    <reply-box :articleId="articleId!"></reply-box>
    <div v-if="commentListS.parentList.length > 0">
      <div style="font-size: 30px; font-weight: 600; margin: 20px 0">
        留言 {{ commentListS.count }}
      </div>
      <parent-comment :articleId="articleId"></parent-comment>
      <div v-if="!commentListS.isMore" class="text">到底了~</div>
    </div>
    <div v-else class="text">无人区</div>
  </div>
</template>

<style scoped lang="scss">
.text {
  @extend center;
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0;
  width: 100%;
}
</style>
