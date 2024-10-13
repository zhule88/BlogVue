<script setup lang="ts">
import inmage from "@/views/Main/Home/image.vue";
import brand from "@/views/Main/Home/up/brand.vue";
import wave from "@/views/Main/Home/up/wave.vue";
import sidebar from "@/views/Main/Home/down/sidebar.vue";
</script>
<template>
  <inmage></inmage>
  <div class="up">
    <brand></brand>
    <wave></wave>
  </div>
  <div class="down">
    <sidebar></sidebar>

    <el-row>
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
    </el-row>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
  transition: transform 0.5s;
  &:hover {
    cursor: pointer;
    transform: rotate(360deg);
  }
}

/* <div class="box"></div> 第二种实现头像旋转的方式*/
.box {
  transition: 0.5s; /* 定义移出回去原来样子的时间 */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url("../../assets/xiubi.jpg") center no-repeat; /* 用自己的图片的路径哈!!! */
  background-size: 100%;
}
.box:hover {
  transition: 0.5s; /* 定义旋转过渡时间 */
  transform: rotate(-180deg); /* 定义旋转的角度 */
  /* 下面是兼容处理 */
  -ms-transform: rotate(-180deg); /* IE 9 */
  -moz-transform: rotate(-180deg); /* Firefox */
  -webkit-transform: rotate(-180deg); /* Safari and Chrome */
  -o-transform: rotate(-180deg); /* Opera */
}
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
  @media screen and (max-width: 1200px) {
    margin: 0;
  }
  // 过渡效果
  transition: margin 0.5s;
  margin: 0 0;
  //border: red 1px solid;
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: var(--mao-background-color);
  width: 100%;
}
.bg {
  // 过渡时间
  transition: all 1s ease !important;
}
</style>
