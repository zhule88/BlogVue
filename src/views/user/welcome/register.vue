<script setup lang="ts">
import { FormRules, FormInstance } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();
const router = useRouter();
const isSuccess = ref(false);
const rules = reactive<FormRules<any>>({
  username: [{ required: true, message: "不能为空", trigger: "blur" }],
  password: [{ required: true, message: "不能为空", trigger: "blur" }],
  email: [{ required: true, message: "不能为空", trigger: "blur" }],
  code: [{ required: true, message: "不能为空", trigger: "blur" }],
  repassword: [
    { required: true, message: "不能为空", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== userS.auth.password) {
          callback(new Error("输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
const submit = () => {
  form.value?.validate(async (valid) => {
    if (valid) {
      if (!((await userS.register()) == "error")) {
        isSuccess.value = true;
      }
    }
  });
};
</script>
<template>
  <div v-if="isSuccess">
    <el-result icon="success" title="注册成功" sub-title="头像非必选项">
      <template #extra>
        <div style="width: 100%; display: flex">
          <el
            large
            button
            @click="router.push('/welcome/login')"
            style="margin-right: 10px"
            >返回登录</el
          >
          <file title="上传头像" @confirm="userS.avatar"></file>
        </div>
      </template>
    </el-result>
  </div>
  <div v-else>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      "
    >
      <div style="font-size: 25px; font-weight: 600">注册</div>

      <el-link
        style="font-size: 15px"
        :underline="false"
        @click="router.push('/welcome/login')"
        >返回登录</el-link
      >
    </div>
    <el-form
      :model="userS.auth"
      ref="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
    >
      <el-form-item prop="username" label="用户名" size="large">
        <el-input
          v-model="userS.auth.username"
          placeholder="用户名"
          maxlength="10"
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
      <el-form-item prop="repassword" label="确认密码" size="large">
        <el-input
          v-model="userS.auth.repassword"
          placeholder="再次输入"
          maxlength="20"
          show-word-limit
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" size="large">
        <el-input
          v-model="userS.auth.email"
          placeholder="输入邮箱"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
      <div style="display: flex">
        <el-form-item prop="code" label="验证码" size="large">
          <el-input
            v-model="userS.auth.code"
            placeholder="输入邮箱验证码"
          ></el-input>
        </el-form-item>
        <el button large style="margin-left: 10px" @click="userS.email()"
          >发送验证码</el
        >
      </div>
    </el-form>
    <el button large :Style="{ width: '100%' }" @click="submit()">注册</el>
  </div>
</template>

<style scoped></style>
