<script setup lang="ts">
import { FormInstance, FormItemRule } from "element-plus";
import { isEmail } from "validator";
const prop = defineProps<{
  form: FormInstance;
}>();
const userS = useUser();
const timer = ref<number>(Number(localStorage.getItem("timer")));
window.onbeforeunload = () => {
  localStorage.setItem("timer", timer.value.toString());
};
const { resume, pause } = useIntervalFn(() => {
  if (timer.value! > 0) {
    timer.value! -= 1;
  } else {
    pause();
  }
}, 1000);
const codeRule: FormItemRule[] = [
  required,
  {
    validator: (rule, value, callback) => {
      if (!isEmail(userS.auth.email)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    },
    trigger: "blur",
  },
];
const submit = () => {
  prop.form.validateField("email", (valid) => {
    if (valid) {
      userS.email();
      timer.value = 60;
      resume();
    }
  });
};
</script>
<template>
  <div>
    <el-form-item prop="email" label="邮箱" size="large" :rules="codeRule">
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
      <el button large style="margin-left: 10px; width: 120px">
        <div @click="submit()" v-show="!timer">发送验证码</div>
        <div v-show="timer">{{ timer }} 秒可发送</div></el
      >
    </div>
  </div>
</template>

<style scoped></style>
