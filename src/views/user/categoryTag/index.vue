<script setup lang="ts">
const route = useRoute();
const tagS = useTag();
const categoryListS = useCategoryList();
const Id = ref(0);
const type = ref("");
const articleListS = reactive(new ArticleList());
const colorI = new color();
const router = useRouter();

onMounted(() => {
  init();
});
watch(route, () => {
  init();
});
const init = async () => {
  window.scrollTo(0, 0);
  Id.value = Number(route.params.id);
  type.value = route.params.type as string;
  if (type.value == "tag") {
    articleListS.listByTagId(Id.value);
  } else {
    articleListS.listByCateId(Id.value);
  }
};
</script>
<template>
  <Layout two>
    <template #main>
      <div style="margin-top: 45px">
        <div class="header" :style="colorI.normal('backgroundColor')">
          <span v-if="type == 'tag'">{{ tagS.map.get(Id) }}</span>
          <span v-else> {{ categoryListS.map.get(Id) }}</span>
        </div>

        <div class="contain">
          <card
            v-animate
            v-for="article in articleListS.list"
            @click="router.push(`/user/article/${article.id}`)"
          >
            <div style="height: 80%; position: relative">
              <div class="title">
                {{ article.title }}
              </div>
              <img :src="article.image" />
            </div>
            <div class="text">
              <div>
                <svgIcon name="火" />
                {{ article.visitCount }}
              </div>
              <div>
                <svgIcon name="日历更新" />
                {{ article.createTime?.substring(0, 10) }}
              </div>
              <div>
                <svgIcon name="更新" />
                {{ article.updateTime?.substring(0, 10) }}
              </div>
            </div>
          </card>
        </div>
      </div>
    </template>
    <template #sidebar>
      <div style="margin-top: 45px">
        <infoCard></infoCard>
        <notice></notice>
        <cateTag></cateTag>
      </div>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
.header {
  height: 2rem;
  width: 100%;
  font-size: 25px;
  font-weight: 500;
  color: rgba(255, 254, 255, 0.938);
  border-radius: $border-radius;
  @extend center;
}
.contain {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 45%;
    margin: 20px auto;
    height: 250px;
    &:hover {
      transform: scale(1.1) !important;
    }
    .title {
      position: absolute;
      top: 80%;
      left: 10%;
      font-size: 25px;
      color: #fff;
      z-index: 10;
      &:hover {
        color: $sky-blue;
      }
    }
    .text {
      font-size: 16px;
      height: 20%;
      display: flex;
      align-items: center;
      & > div {
        margin: auto;
      }
    }
    img {
      border-radius: $border-radius $border-radius 0 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
