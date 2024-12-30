<script setup lang="ts">
import { FormRules, FormInstance, ElMessage } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();
const persist = ref(true);
const isEmail = ref(false);
const router = useRouter();

const rules = reactive<FormRules<any>>({
  email: [{ required: true, message: "不能为空", trigger: "blur" }],
  password: [{ required: true, message: "不能为空", trigger: "blur" }],
});
const submit = () => {
  form.value?.validate((valid) => {
    if (valid) {
      userS.login();
    } else {
      ElMessage.error("表单未填写完毕");
    }
  });
};
</script>
<template>
  <div>
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
      <el-form-item prop="email" label="邮箱" size="large">
        <el-input
          v-model="userS.item.email"
          placeholder="输入邮箱"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
      <div v-show="!isEmail">
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
    </el-form>
    <div style="display: flex; justify-content: space-between">
      <el-checkbox v-model="persist" label="勿忘我" />
      <el-link style="font-size: 15px">验证码登录</el-link>
    </div>

    <div v-show="isEmail"></div>
    <el button large :Style="{ width: '100%' }" @click="submit()">登录</el>
  </div>
</template>

<style scoped></style>
