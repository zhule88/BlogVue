<script setup lang="ts"></script>
<template>
  <div>
    <el-card
      shadow="hover"
      body-style="

"
    >
      <div class="ccard">
        <img src="../../../../assets/xiubi.jpg" alt="" />
        <div style="border-radius: 20px">
          <p
            style="text-align: center; color: bisque; writing-mode: vertical-lr"
          >
            正在路上
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
  transition: transform 0.5s;
  text-align: center;
  &:hover {
    cursor: pointer;
    transform: rotate(360deg);
  }
}
/* .el-card {
  border-radius: 20px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
} */
.ccard {
  background: url("../../../../assets/你的名字.jpg");
  background-size: 150%;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
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
