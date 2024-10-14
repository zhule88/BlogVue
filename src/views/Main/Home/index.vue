<script setup lang="ts">
import inmage from "@/views/Main/Home/image.vue";
import brand from "@/views/Main/Home/up/brand.vue";
import wave from "@/views/Main/Home/up/wave.vue";
import sidebar from "@/views/Main/Home/down/sidebar.vue";
import mmain from "@/views/Main/Home/down/main.vue";
</script>
<template>
  <inmage></inmage>
  <div class="up">
    <brand></brand>
    <wave></wave>
  </div>
  <div class="down">
    <div style="width: 70%; display: flex">
      <mmain style="width: 70%"></mmain>
      <sidebar style="width: 30%"></sidebar>
    </div>
    <!--  <el-row>
      <el-col :span="8"
        ><div
          class="card card-compact w-96 bg-base-100 shadow-xl card-bordered"
          style="margin: 0 auto; height: 200px; width: 150px"
        >
          <figure>
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="@/assets/xiubi.jpg" />
              </div>
            </div>
          </figure>
          <div class="card-body" style="text-align: center">正在路上</div>
        </div></el-col
      >
      <el-col :span="16"> </el-col>
    </el-row> -->
  </div>
</template>

<style scoped lang="scss">
.up {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
  color: var(--header-text-color);
}
.down {
  // 过渡效果
  transition: margin 0.5s;
  margin: 0 0;
  //border: red 1px solid;
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: var(--mao-background-color);
  width: 100%;
  @media screen and (max-width: 1200px) {
    margin: 0;
  }
}
</style>
