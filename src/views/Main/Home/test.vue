<script setup lang="ts"></script>
<template>
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
</template>

<style scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
  transition: transform 0.5s;
}

img:hover {
  cursor: pointer;
  transform: rotate(360deg);
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
</style>
