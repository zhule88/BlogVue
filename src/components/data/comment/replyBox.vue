<script setup lang="ts">
import axios from "axios";
import { emojis } from "./emojis";
import bowser from "bowser";
const prop = defineProps<{
  articleId: number;
  parentId?: number;
  replyId?: number;
}>();
const userAgent = window.navigator.userAgent;
const browser = bowser.getParser(userAgent);
const commentS = reactive(new COmment());
const userS = useUser();
const popRef = ref();
const router = useRouter();

const submit = async () => {
  commentS.item.browser = `${browser.getBrowserName()} ${browser.getBrowserVersion()}`;
  const res = await axios.get("https://ip.useragentinfo.com/json");
  if (res.status == 200) {
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
  commentS.item.userId = userS.item.id;
  commentS.item.location == "" ? "未知" : commentS.item.location;
  commentS.item.articleId = prop.articleId;
  if (prop.parentId) {
    commentS.item.parentId = prop.parentId;
  }
  if (prop.replyId) {
  }
  commentS.add();
  commentS.clear();
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
          width: 100%;
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
        <el button small @click="submit" v-if="userS.item.id"> 发布</el>
        <el button small @click="router.push('/welcome/login')" v-else>登陆</el>
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
  width: 100%;
  height: 100px;
  padding: 1rem;
  border-radius: $border-radius;
  box-sizing: border-box;
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
