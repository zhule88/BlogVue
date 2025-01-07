<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();

const router = useRouter();
const rules = reactive<FormRules<any>>({
  password: [required],
  repassword: [
    required,
    {
      validator: (_rule, value, callback) => {
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
      if (!((await userS.userReset(userS.auth)) == "error")) {
        router.push("/welcome/login");
      }
    }
  });
};
</script>
<template>
  <div style="width: 100%">
    <div class="title">
      <div style="font-size: 25px; font-weight: 600">重置密码</div>
      <el link @click="router.push('/welcome/login')">返回登录</el>
    </div>
    <el-form
      :model="userS.auth"
      ref="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
    >
      <el-form-item prop="password" label="新密码" size="large">
        <el-input
          v-model="userS.auth.password"
          placeholder="输入新密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码" size="large">
        <el-input
          v-model="userS.auth.repassword"
          placeholder="再次输入"
          show-password
        ></el-input>
      </el-form-item>
      <emailCode :form="form!"></emailCode>
    </el-form>

    <el button large :Style="{ width: '100%' }" @click="submit()">重置密码</el>
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
