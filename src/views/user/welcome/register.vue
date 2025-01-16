<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
const userS = useUser();
const form = ref<FormInstance>();
const router = useRouter();
const isSuccess = ref(false);
const rules = reactive<FormRules<any>>({
  username: [required],
  password: [required],
  repassword: [
    required,
    {
      validator: (_rule, value, callback) => {
        if (value !== userS.item.password) {
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
      if (!((await userS.userRegister(userS.item)) == "error")) {
        isSuccess.value = true;
      }
    }
  });
};
</script>
<template>
  <div style="width: 100%">
    <div v-if="isSuccess">
      <el-result icon="success" title="注册成功" sub-title="头像非必选项">
        <template #extra>
          <div style="width: 100%; display: flex">
            <el
              link
              @click="router.push('/welcome/login')"
              style="margin-right: 10px"
              >返回登录</el
            >
            <fileUpload
              title="上传头像"
              @confirm="(e: File)=>{ userS.avatar(e);router.push('/welcome/login')}"
            ></fileUpload>
          </div>
        </template>
      </el-result>
    </div>
    <div v-else>
      <div class="title">
        <div style="font-size: 25px; font-weight: 600">注册</div>
        <el-link
          style="font-size: 15px"
          :underline="false"
          @click="router.push('/welcome/login')"
          >返回登录</el-link
        >
      </div>
      <el-form
        :model="userS.item"
        ref="form"
        label-width="80px"
        label-position="left"
        :rules="rules"
      >
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
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码" size="large">
          <el-input
            v-model="userS.item.repassword"
            placeholder="再次输入"
            show-password
          ></el-input>
        </el-form-item>
        <emailCode :form="form!"></emailCode>
      </el-form>

      <el button large :Style="{ width: '100%' }" @click="submit()">注册</el>
    </div>
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
