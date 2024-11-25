<script setup lang="ts">
import card from "@/components/card.vue";
import info from "@/views/user/Home/down/sidebar/info.vue";
import sideCard from "@/components/sideCard.vue";
import { ArticleList } from "@/service";
import color from "@/utils/color";
import { useTag, useCategoryList } from "@/stores";
const tagS = useTag();
const categoryListS = useCategoryList();
const colorI = new color();
const articleListS = new ArticleList();
const count = ref<number[]>([]);

onMounted(async () => {
  categoryListS.list.forEach(async (item) => {
    count.value.push(await articleListS.count(item.id));
  });
});
</script>
<template>
  <div>
    <info></info>
    <card style="padding: 20px" v-view-request="{}">
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
      <div class="category" :style="{ '--color': colorI.random() }">
        <div v-for="(item, index) in categoryListS.list" class="text">
          <span class="right">{{ item.name }}</span>
          <span class="left">{{ count[index] }}</span>
        </div>
      </div>
    </sideCard>

    <sideCard title="标签" icon="标签">
      <div class="tag">
        <div v-for="item in tagS.list">
          <div class="test" :style="{ '--color': colorI.random() }">
            {{ item.name }}
          </div>
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
  .text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
    font-size: 17px;
    border-radius: 10px;
    .right {
      transition: transform 0.3s ease;
    }
    .left {
      transition: transform 0.3s ease;
    }
    &:hover {
      background: var(--color);
      /* background: $sky-blue; */
    }
    &:hover .right {
      transform: translateX(10px);
    }
    &:hover .left {
      transform: translateX(-10px);
    }
  }
}
.tag {
  display: flex;

  .test {
    @extend center;
    margin: 0.5rem;
    border-radius: $border-radius;
    height: 2rem;
    padding: 0 0.5rem;
    &:hover {
      color: white;
      background: var(--color);
    }
  }
}
</style>
