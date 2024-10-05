<script setup lang="ts">
import {ref} from  'vue'
const msg = ref<String>();
const clik = () => {
  msg.value = "Hellow,world"
}
</script>

<template>
<h1>
  {{ msg }}
</h1>
<button @click="clik">世界你好</button>
</template>

<style scoped>

</style>
