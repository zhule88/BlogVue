<script setup lang="ts">
import axios from "axios";
import { emojis } from "./emojis";
import bowser from "bowser";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
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
const themeS = useTheme();
const isPreview = ref(false);
const emit = defineEmits(["submit"]);

const submit = async () => {
  commentS.item.browser = `${browser.getBrowserName()} ${browser.getBrowserVersion()}`;
  try {
    const res = await axios.get("https://ip.useragentinfo.com/json");
    commentS.item.location = res.data.province;
  } catch (error) {
    try {
      const res = await axios.get("https://myip.ipip.net/s");
      const ress = await axios.get(
        "https://api.vore.top/api/IPdata?ip=" + res.data
      );
      commentS.item.location = ress.data.ipdata.info1;
    } catch (error) {
      commentS.item.location = "未知";
    }
  }
  commentS.item.userId = userS.item.id;
  commentS.item.articleId = prop.articleId;
  if (prop.parentId) {
    commentS.item.parentId = prop.parentId;
  }
  if (prop.replyId) {
    commentS.item.parentId = prop.replyId;
  }
  await commentS.add();
  commentS.clear();
  emit("submit");
};
</script>
<template>
  <div style="width: 100%">
    <div class="contain">
      <textarea
        placeholder="留下足迹~"
        v-model="commentS.item.content"
        style="transition: all 0.4s ease-out"
      ></textarea>

      <div
        style="
          display: flex;
          width: 100%;

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
        <el
          button
          small
          @click="isPreview = !isPreview"
          style="margin-left: auto"
        >
          预览</el
        >
        <el button small @click="submit" v-if="userS.item.id"> 发布</el>
        <el button small @click="router.push('/welcome/login')" v-else>登陆</el>
      </div>
      <MdPreview
        v-show="isPreview"
        v-model="commentS.item.content"
        :theme="themeS.isdark ? 'dark' : 'light'"
        style="border-radius: 10px"
      />
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
:deep(#md-editor-v3) {
  font-family: cartoon;
  color: var(--text-color);
  transition: $transition;
  margin: 5px 0;
  common {
    margin: 0;
    color: var(--text-color);
  }
  h1 {
    font-size: 25px;
    @extend common;
  }
  h2 {
    font-size: 23px;
    @extend common;
  }
  h3 {
    font-size: 21px;
    @extend common;
  }
  h4 {
    font-size: 19px;
    @extend common;
  }
  h5 {
    font-size: 17px;

    @extend common;
  }
  h6,
  p {
    font-size: 15px;
    @extend common;
  }
}
</style>
