<script setup lang="ts">
import article from "@/types/modules/article";

const router = useRouter();
const articleS = new ArticleList();
const list = ref(new Map<number, article[]>());
const years = ref();
onMounted(async () => {
  await articleS.init();
  articleS.list.forEach((item) => {
    const year = new Date(item.createTime!).getFullYear();
    if (list.value.has(year)) {
      list.value.get(year)!.push(item);
    } else {
      list.value.set(year, [item]);
    }
  });
  years.value = Array.from(list.value.keys()).sort((a, b) => b - a);
  list.value.forEach((articles) => {
    articles.sort(
      (a, b) =>
        new Date(b.createTime!).getTime() - new Date(a.createTime!).getTime()
    );
  });
});
</script>
<template>
  <layout title="文章">
    <div class="timeline">
      <div style="width: 100%; height: 75px; font-size: 30px; font-weight: 600">
        全部文章—— {{ articleS.list.length }}
      </div>
      <div v-for="year in years">
        <div
          style="width: 100%; height: 75px; font-size: 25px; font-weight: 500"
        >
          {{ year }}
        </div>
        <div
          class="timeline-item"
          v-for="item in list.get(year)"
          @click="router.push(`/user/article/${item.id}`)"
        >
          <div class="img">
            <img
              :src="item.image"
              style="height: 100%; width: 100%; object-fit: cover"
            />
          </div>
          <div style="width: 100%">
            <div class="item-content">{{ item.title }}</div>
            <div class="item-content">
              {{ item.createTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
  padding: 20px 60px 20px;
  list-style: none;

  &::before {
    content: "";
    position: absolute;
    left: 26px;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: var(--text-color);
  }
  .timeline-item {
    width: 100%;
    height: 75px;
    display: flex;
    position: relative;
    padding: 10px 0;
    transition: $transition;
    background: var(--color-card);
    .img {
      height: 100%;
      width: 100px;
      overflow: hidden;
      border-radius: $border-radius;
    }
    &::before {
      content: "";
      position: absolute;
      left: -39px;
      top: 45%;
      width: 11px;
      height: 11px;
      background-color: var(--text-color);
      border-radius: 50%;
    }
    &:hover {
      filter: brightness(90%);
      color: $sky-blue;
      &::before {
        background-color: $sky-blue;
      }
    }
    .item-content {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
