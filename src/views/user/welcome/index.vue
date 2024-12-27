<script setup lang="ts">
import Header from "@/layout/user/Header/Header.vue";
import { FormRules, FormInstance, ElMessage } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  email: [{ required: true, message: "不能为空", trigger: "blur" }],
  password: [{ required: true, message: "不能为空", trigger: "blur" }],
});
const submit = () => {
  form.value?.validate((valid) => {
    if (valid) {
      userS.login();
    } else {
      ElMessage.error("账号或密码不能为空");
    }
  });
};
</script>
<template>
  <Header></Header>
  <div style="width: 100vw; display: flex">
    <img src="@/assets/image/休比.png" style="width: 75%; height: 100vh" />
    <card>
      <div class="contain">
        <div style="font-size: 25px; font-weight: 600; margin-bottom: 2rem">
          登录
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
          <el-form-item prop="password" label="密码" size="large" required>
            <el-input
              v-model="userS.item.password"
              placeholder="输入密码"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button @click="submit()">登录 </el-button>
      </div>
    </card>
  </div>
</template>

<style scoped lang="scss">
.card {
  font-size: 15px;
  width: 25%;
  height: 100vh;
  margin: 0;
  @extend center;
  .contain {
    display: flex;
    flex-direction: column;
  }
}
</style>
