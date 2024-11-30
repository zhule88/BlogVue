<script setup lang="ts">
import info from "@/components/view/infoCard.vue";
import sideCard from "@/components/data/sideCard.vue";
import { ArticleList } from "@/service";
import color from "@/utils/color";
import { useTag, useCategoryList } from "@/stores";
const tagS = useTag();
const categoryListS = useCategoryList();
const colorI = new color();
const articleListS = new ArticleList();
const count = ref<number[]>([]);
const router = useRouter();
onMounted(async () => {
  categoryListS.list.forEach(async (item) => {
    count.value.push(await articleListS.count(item.id));
  });
});
</script>
<template>
  <div>
    <info></info>
    <notice></notice>
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
        <div
          v-for="item in tagS.list"
          @click="router.push(`/user/tag/${item.id}`)"
        >
          <div class="test" :style="{ '--color': colorI.random() }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </sideCard>
  </div>
</template>

<style scoped lang="scss">
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
