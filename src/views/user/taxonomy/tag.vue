<script setup lang="ts">
import { useTag } from "@/stores";
const route = useRoute();
const tagS = useTag();
const tagId = ref(1);
onMounted(() => {
  tagId.value = Number(route.params.id as string);
  console.log(tagS.map.get(tagId.value));
});
</script>
<template>
  <div style="width: 75%; margin: 5rem auto 0">
    <SideCard
      icon="标签"
      :title="tagS.map.get(tagId)"
      class="contain"
    ></SideCard>
  </div>
</template>

<style scoped lang="scss">
.contain {
}
</style>
