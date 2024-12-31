<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();
const persist = ref(true);
const isEmailLogin = ref(false);
const router = useRouter();
const rules = reactive<FormRules<any>>({
  email: [required],
  usename: [required],
  password: [required],
});
const submit = () => {
  form.value?.validate(async (valid) => {
    if (valid) {
      if ((await userS.login()) != "error") {
        router.push("/");
      }
    }
  });
};
</script>
<template>
  <div style="width: 100%">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      "
    >
      <div style="font-size: 25px; font-weight: 600">登录</div>
      <el-link
        style="font-size: 15px"
        :underline="false"
        @click="router.push('/welcome/register')"
        >立即注册</el-link
      >
    </div>
    <el-form :model="userS.item" ref="form" :rules="rules">
      <div v-show="!isEmailLogin">
        <el-form-item prop="email" label="邮箱" size="large">
          <el-input
            v-model="userS.auth.email"
            placeholder="输入邮箱"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="large">
          <el-input
            v-model="userS.auth.password"
            placeholder="输入密码"
            maxlength="20"
            show-word-limit
            show-password
          ></el-input>
        </el-form-item>
      </div>
      <emailCode :form="form!" v-show="isEmailLogin"></emailCode>
    </el-form>
    <div style="display: flex; justify-content: space-between">
      <el-checkbox v-model="persist" label="勿忘我" />
      <el-link style="font-size: 15px" @click="isEmailLogin = !isEmailLogin">{{
        isEmailLogin ? "密码登录" : "验证码登录"
      }}</el-link>
    </div>

    <el button large :Style="{ width: '100%' }" @click="submit()">登录</el>
  </div>
</template>

<style scoped></style>
