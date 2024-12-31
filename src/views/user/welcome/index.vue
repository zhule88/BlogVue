<script setup lang="ts">
import Header from "@/layout/user/Header/Header.vue";
</script>
<template>
  <Header></Header>
  <div style="width: 100vw; display: flex">
    <img src="@/assets/image/休比.png" style="width: 70%; height: 100vh" />
    <card>
      <div class="card_small">
        <RouterView />
      </div>
    </card>
  </div>
</template>

<style scoped lang="scss">
.card {
  font-size: 15px;
  flex-grow: 1;
  height: 100vh;
  margin: 0;
  @extend center;
  .card_small {
    @extend center;
    width: 80%;
  }
}
</style>
