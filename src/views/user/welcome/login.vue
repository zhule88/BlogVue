<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();

const isEmailLogin = ref(false);
const router = useRouter();
const rules = reactive<FormRules<any>>({
  username: [required],
  password: [required],
});
const submit = () => {
  form.value?.validate(async (valid) => {
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
    <div class="title">
      <div style="font-size: 25px; font-weight: 600">登录</div>
      <el link @click="router.push('/welcome/register')">立即注册</el>
    </div>
    <el-form
      :model="userS.item"
      ref="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
    >
      <div v-if="!isEmailLogin">
        <el-form-item prop="username" label="用户名" size="large">
          <el-input
            v-model="userS.item.username"
            placeholder="输入用户名"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="large">
          <el-input
            v-model="userS.item.password"
            placeholder="输入密码"
            maxlength="20"
            show-word-limit
            show-password
          ></el-input>
        </el-form-item>
      </div>
      <emailCode :form="form!" v-else></emailCode>
    </el-form>
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 20px"
    >
      <el link @click="router.push('/welcome/reset')">忘记密码?</el>
      <el link @click="isEmailLogin = !isEmailLogin">{{
        isEmailLogin ? "密码登录" : "验证码登录"
      }}</el>
    </div>
    <el button :Style="{ width: '100%' }" @click="submit()">登录</el>
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
