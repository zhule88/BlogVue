<script setup lang="ts">
import axios from "axios";
import { emojis } from "./emojis";
import bowser from "bowser";

const userAgent = window.navigator.userAgent;
const browser = bowser.getParser(userAgent);
const commentS = reactive(new COmment());
const popRef = ref();

const submit = async () => {
  commentS.item.bowser = `${browser.getBrowserName()} ${browser.getBrowserVersion()}`;
  const res = await axios.get("https://ip.useragentinfo.com/json");
  if (!(res.status == 200)) {
    commentS.item.location = res.data.province;
  } else {
    axios.get("https://myip.ipip.net/s").then(async (res) => {
      axios
        .get("https://api.vore.top/api/IPdata?ip=" + res.data)
        .then((res) => {
          commentS.item.location = res.data.ipdata.info1;
        });
    });
  }
  commentS.item.location == "" ? "未知" : commentS.item.location;
  console.log(commentS.item);
  /* commentS.add(); */
};
</script>
<template>
  <div style="width: 100%">
    <div class="contain">
      <textarea
        placeholder="留下足迹~"
        v-model="commentS.item.content"
      ></textarea>
      <div
        style="
          display: flex;
          width: 70%;
          justify-content: space-between;
          align-items: center;
          margin-top: 5px;
        "
      >
        <el-popover
          placement="bottom-end"
          :width="510"
          trigger="click"
          ref="popRef"
        >
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
                  @click="(commentS.item.content += emoji), popRef.hide()"
                >
                  {{ emoji }}
                </div>
              </div>
            </el-scrollbar>
          </div>
        </el-popover>
        <el button small @click="submit"> 发布</el>
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
  padding: 1rem;
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
