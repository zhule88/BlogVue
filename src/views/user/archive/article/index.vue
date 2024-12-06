<script setup lang="ts">
import { article } from "@/types";

const articleListS = new ArticleList();
const handleData = (data: article[]) => {
  // 过滤内容
  data.forEach((item) => {
    item.content = contentFilter(item.content).substring(0, 100);
    const year = new Date(item.createTime as string).getFullYear();
    if (!items.value.has(year)) {
      items.value.set(year, []);
    }
    const num = items.value.get(year);
    num.push(item);
    items.value.set(year, num);
  });
};

const shellRef = ref();

const items = ref(new Map());
onMounted(async () => {
  await articleListS.init();
  handleData(articleListS.list.value);
  await nextTick(() => {
    const shell = shellRef.value;
    const itemElements = shell.querySelectorAll(".item");
    const itemsArray: any[] = Array.from(itemElements);

    // 将第一个时间轴项目激活，并设置时间轴背景图片为第一个项目的图片
    itemsArray[0].classList.add("item--active");
    shell.style.backgroundImage = `url(${
      itemsArray[0].querySelector(".img").src
    })`;

    // 当页面滚动时，触发滚动事件
    window.addEventListener("scroll", () => {
      const pos = window.scrollY;
      itemsArray.forEach((item, i) => {
        const min = item.offsetTop;
        const max = item.offsetHeight + item.offsetTop;

        // 如果滚动到最后一个项目，并且超过了当前项目高度的一半，
        // 则将最后一个项目设置为激活状态，并设置背景图片为最后一个项目的图片
        if (i === itemsArray.length - 2 && pos > min + item.offsetHeight / 2) {
          itemsArray.forEach((item) => item.classList.remove("item--active"));
          shell.style.backgroundImage = `url(${
            itemsArray[itemsArray.length - 1].querySelector(".img").src
          })`;
          itemsArray[itemsArray.length - 1].classList.add("item--active");
        }
        // 如果当前滚动位置在当前项目的最小和最大高度之间，
        // 则将当前项目设置为激活状态，并设置背景图片为当前项目的图片
        else if (pos <= max - 10 && pos >= min) {
          shell.style.backgroundImage = `url(${
            item.querySelector(".img").src
          })`;
          itemsArray.forEach((item) => item.classList.remove("item--active"));
          item.classList.add("item--active");
        }
      });
    });
  });
});
</script>
<template>
  <layout>
    <div class="shell" ref="shellRef">
      <div class="timeline">
        <div v-for="[key, value] in Array.from(items.entries())">
          <div class="year">--{{ key }}--</div>
          <div
            class="item"
            @click="$router.push(`/article/${i.id}`)"
            :data-text="i.createTime"
            v-for="i in value"
          >
            <div class="content">
              <img class="img" :src="i.image" />
              <h2 class="content-title">{{ i.title }}</h2>
              <p class="content-desc">{{ i.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<style lang="scss" scoped>
@import "index.scss";

.year {
  background-color: white;
  position: sticky;
  top: 5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: grey;
  border-radius: $border-radius;
  // 背景透明度
  opacity: 0.8;
}
</style>
