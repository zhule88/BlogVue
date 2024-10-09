<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
const Theme = ref<string[]>([
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
]);
const ThemeIndex = ref(0);
onMounted(() => {
  const theme = localStorage.getItem("theme");
  if (theme != null && theme != undefined) {
    ThemeIndex.value = parseInt(theme);
    document.documentElement.setAttribute(
      "data-theme",
      Theme.value[ThemeIndex.value]
    );
  }
  localStorage.setItem("theme", "0");
});
const ThemeChange = () => {
  ThemeIndex.value += 1;
  if (ThemeIndex.value > 21) {
    ThemeIndex.value = 0;
  }
  document.documentElement.setAttribute(
    "data-theme",
    Theme.value[ThemeIndex.value]
  );
};
</script>
<template>
  <el-header>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">筑乐</a>
      </div>

      <ul class="menu menu-horizontal bg-base-100">
        <li><button class="btn btn-outline">文章</button></li>
        <li><button class="btn btn-outline">力扣</button></li>
        <li><button class="btn btn-outline">归档</button></li>
        <li><button class="btn btn-outline">留言</button></li>
        <li><button class="btn btn-outline">随想</button></li>
        <li>
          <button class="btn btn-outline" @click="ThemeChange">主题</button>
        </li>
      </ul>
    </div>
  </el-header>
</template>

<style scoped></style>
