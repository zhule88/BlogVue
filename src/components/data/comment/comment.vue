<script setup lang="ts">
const commentS = reactive(new COmment());
const userS = reactive(new User());

const detailList = computed(() => {
  return commentS.list.map((comment) => {
    return {
      ...userS.map.get(comment.userId!),
      ...comment,
    };
  });
});
const prop = defineProps<{
  articleId: number;
}>();
onMounted(async () => {
  commentS.item.articleId = prop.articleId;
  await commentS.init();
  userS.listByIds([...new Set(commentS.list.map((c) => c.userId!))]);
});
</script>
<template>
  <div>
    <reply-box :articleId="articleId!"></reply-box>
    <div style="font-size: 30px; font-weight: 600; margin: 20px 0">
      留言 {{ commentS.list.length }}
    </div>
    <card v-for="item in detailList" v-animate>
      <div style="width: 100%; display: flex">
        <el-avatar :src="item.avatar" />
        <div style="font-size: 20px; margin: auto 0 auto 5px">
          {{ item.username }}
        </div>
        <div style="font-size: 15px; margin-left: auto">
          {{ item.createTime }}
        </div>
      </div>
      <div class="content">
        {{ item.content }}
      </div>
      <div style="display: flex">
        <el tag style="margin-right: 5px"> {{ item.location }}</el>
        <el tag>{{ item.browser }}</el>
      </div>
    </card>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  min-height: 50px;
  margin: 5px 0;
  padding: 0.5rem 1rem;
  .content {
    width: 100%;
    margin: 5px 0;
    font-size: 15px;
  }
}
</style>
