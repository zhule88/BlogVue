<script setup lang="ts">
import card from "@/components/card.vue";
import info from "@/views/user/Home/down/sidebar/info.vue";
import sideCard from "@/components/sideCard.vue";
import { CategoryList, ArticleList } from "@/service";
import color from "@/utils/color";

const colorI = new color();
const categoryListS = new CategoryList();
const articleListS = new ArticleList();
const count = ref<number[]>([]);
onMounted(async () => {
  await categoryListS.init();
  categoryListS.list.value.forEach(async (item) => {
    count.value.push(await articleListS.count(item.id));
  });
});
</script>
<template>
  <div>
    <info></info>
    <card style="padding: 20px">
      <div style="display: flex; justify-content: center">
        <img
          class="small-bell"
          src="../../../../../assets/icons/铃铛.svg"
          style="height: 30px"
        />
      </div>
      <p>没有公告</p>
    </card>
    <sideCard title="分类" icon="分类">
      <div class="category">
        <div v-for="(item, index) in categoryListS.list.value" class="text">
          <span class="right">{{ item.name }}</span>
          <span class="left">{{ count[index] }}</span>
        </div>
      </div>
    </sideCard>
  </div>
</template>

<style scoped lang="scss">
/* :style="colorI.high('background')" */
.small-bell {
  animation: rotate 0.75s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
.category {
  @extend center;
  flex-direction: column;
  padding-bottom: 20px;
  .text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 3rem;
    font-size: 17px;
    border-radius: 10px;
    .right {
      transition: transform 0.3s ease;
    }
    .left {
      transition: transform 0.3s ease;
    }
    &:hover {
      background: $sky-blue;
    }
    &:hover .right {
      transform: translateX(10px);
    }
    &:hover .left {
      transform: translateX(-10px);
    }
  }
}
</style>
