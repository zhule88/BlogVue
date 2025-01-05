<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();
const persist = ref(true);
const isEmailLogin = ref(false);
const router = useRouter();
const rules = reactive<FormRules<any>>({
  username: [required],
  password: [required],
});
const submit = () => {
  form.value?.validate(async (valid) => {
    console.log(valid);
    if (valid) {
      if (await userS.login()) {
        userS.info();
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
    <el-form :model="userS.auth" ref="form" :rules="rules">
      <div v-if="!isEmailLogin">
        <el-form-item prop="username" label="昵称" size="large">
          <el-input
            v-model="userS.auth.username"
            placeholder="输入用户名"
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
      <emailCode :form="form!" v-else></emailCode>
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
