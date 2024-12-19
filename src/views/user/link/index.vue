<script setup lang="ts">
import { FormRules, FormInstance, ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
const linkS = new Link();
const linkListS = reactive(new LinkList());
const dialogVisible = ref(false);
const form = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
  address: [{ required: true, message: "不能为空", trigger: "blur" }],
  description: [{ required: true, message: "不能为空", trigger: "blur" }],
  avatar: [{ required: true, message: "不能为空", trigger: "blur" }],
  email: [{ required: true, message: "不能为空", trigger: "blur" }],
});
const submit = () => {
  form.value?.validate((valid, fields) => {
    if (valid) {
      ElMessage.success("提交成功，通过后会通过邮箱通知您");
      linkS.add();
      dialogVisible.value = false;
    } else {
      ElMessage.error(fields);
    }
  });
};
onMounted(() => {
  linkListS.init();
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="申请友链"
    width="35%"
    style="border-radius: 10px"
  >
    <div class="form">
      <div
        style="display: flex; align-items: center; margin-bottom: 1rem"
      ></div>
      <el-form :model="linkS.item" ref="form" :rules="rules">
        <el-form-item prop="nickname">
          <el-input
            v-model="linkS.item.nickname"
            placeholder="填写自己或网站昵称"
            maxlength="15"
            show-word-limit
          >
            <template #prepend> 昵称 </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input
            v-model="linkS.item.address"
            placeholder="填写网站地址"
            maxlength="50"
            show-word-limit
          >
            <template #prepend> 地址 </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="description">
          <el-input
            v-model="linkS.item.description"
            placeholder="填写自己或网站简介"
            maxlength="30"
            show-word-limit
          >
            <template #prepend> 简介 </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="avatar">
          <el-input
            v-model="linkS.item.avatar"
            placeholder="填写头像地址"
            maxlength="100"
            show-word-limit
          >
            <template #prepend> 头像 </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="linkS.item.email"
            placeholder="填写邮箱地址"
            maxlength="20"
            show-word-limit
          >
            <template #prepend> 邮箱 </template>
          </el-input>
        </el-form-item>
        <div style="width: 100%; display: flex; flex-direction: row-reverse">
          <el-button plain @click="submit()">提交申请</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
  <layout Title="友链">
    <div
      style="width: 95%; height: 40px; display: flex; padding: 20px 2.5% 0 2.5%"
    >
      <div style="font-size: 30px; font-weight: 500">小伙伴~</div>
      <div style="margin-left: auto; height: 100%">
        <el-button type="primary" @click="dialogVisible = true" size="large"
          >申请友链</el-button
        >
      </div>
    </div>

    <div class="blog_contain">
      <div class="blog" v-for="item in linkListS.list">
        <div class="img">
          <img src="../../../assets/xiubi.jpg" />
        </div>
        <div style="width: 60%; z-index: 1">
          <div class="item-content" style="font-size: 30px; font-weight: 500">
            {{ item.nickname }}
          </div>
          <div class="item-content">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<style lang="scss" scoped>
.blog_contain {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 20px 5%;
  padding: 20px 0;
  .blog {
    position: relative;
    display: flex;
    width: 25%;
    height: 150px;
    border-radius: $border-radius;
    &:hover {
      /*    background: $sky-blue; */
      img {
        transform: rotate(360deg);
      }

      &::before {
        opacity: 1; /* 鼠标悬停时显示伪元素 */
        transform: scale(1);
        /* background: $sky-blue; */
        background: var(--color-like);
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scale(0);
      border-radius: inherit;
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s;
    }

    .img {
      width: 40%;
      height: 100%;
      @extend center;
      z-index: 1;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transition: transform 0.5s;
      }
    }
    .item-content {
      height: 50%;
      width: 100%;
      @extend center;
    }
  }
}
</style>
