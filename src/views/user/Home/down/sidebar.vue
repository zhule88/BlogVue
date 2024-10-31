<script setup lang="ts"></script>
<template>
  <div>
    <div class="card">
      <div class="ccard">
        <img class="avatar" src="../../../../assets/xiubi.jpg" alt="" />
        <div
          style="
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          "
        >
          <p id="geyan">正在路上</p>
        </div>
      </div>
      <div style="display: flex">
        <div class="bo">
          <p>文章</p>
          <p>114514</p>
        </div>
        <div class="bo">
          <p>评论</p>
          <p>1919810</p>
        </div>
      </div>
    </div>
    <div class="card" style="padding: 20px">
      <div style="display: flex; justify-content: center">
        <img
          class="lingdang"
          src="../../../../assets/014_通知-35.svg"
          style="height: 30px"
        />
      </div>
      <p>没有公告</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lingdang {
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
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: transform 0.5s;
  &:hover {
    cursor: pointer;
    transform: rotate(360deg);
  }
}
.card {
  background-color: var(--el-bg-color);
  border-radius: 20px;
  width: 100%;
  margin: 20px 0;
  box-shadow: 1px 1px 1px 0px #625e5e;
}
.ccard {
  background: url("../../../../assets/你的名字.jpg");
  background-size: 150%;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
}

#geyan {
  text-align: center;
  color: bisque;
  writing-mode: vertical-lr;
}

.bo {
  width: 50%;
  padding-bottom: 2rem;
  p {
    font-size: 20px;
    text-align: center;
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
</style>
