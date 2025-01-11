<script setup lang="ts">
import { emojis } from "./emojis";
</script>
<template>
  <div style="width: 100%">
    <div class="contain">
      <textarea placeholder="留下足迹~"></textarea>
      <div style="display: flex; width: 70%; justify-content: space-between">
        <el-popover placement="bottom-end" :width="510" trigger="click">
          <template #reference>
            <SvgIcon
              name="笑"
              height="20px"
              width="20px"
              style="cursor: pointer"
            />
          </template>
          <div>
            <el-scrollbar height="200px">
              <div style="display: flex; flex-wrap: wrap">
                <div
                  class="emoji"
                  v-for="(emoji, key) in emojis"
                  :key="key"
                  :title="key"
                >
                  {{ emoji }}
                </div>
              </div>
            </el-scrollbar>
          </div>
        </el-popover>
        <el button> 发布</el>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contain {
  width: 100%;
  @extend center;
  flex-direction: column;
}
textarea {
  width: 70%;
  height: 100px;
  padding: 0.5rem;
  border-radius: $border-radius;
  resize: none;
}
.emoji {
  padding: 5px;
  font-size: 30px;
  &:hover {
    background: var(--color-card);
    filter: brightness(80%);
  }
}
</style>
