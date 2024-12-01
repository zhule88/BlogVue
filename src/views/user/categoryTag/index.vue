<script setup lang="ts">
import { useTag, useCategoryList } from "@/stores";
import { ArticleTag, ArticleList } from "@/service";
const route = useRoute();
const tagS = useTag();
const categoryListS = useCategoryList();
const Id = ref(0);
const type = ref("");
const articleTagS = new ArticleTag();
const articleListS = new ArticleList();
const router = useRouter();

onMounted(() => {
  init();
});
watch(route, () => {
  init();
});
const init = async () => {
  Id.value = Number(route.params.id);
  type.value = route.params.type as string;
  if (type.value == "tag") {
    const res = await articleTagS.articleList(Id.value);
    articleListS.listByIds(res.data);
  } else {
    articleListS.listByCateId(Id.value);
  }
};
</script>
<template>
  <Layout>
    <template #main>
      <Card style="margin-top: 45px"
        ><div class="header" v-if="type == 'tag'">
          {{ tagS.map.get(Id) }}
        </div>
        <div class="header" v-else>
          {{ categoryListS.map.get(Id) }}
        </div>
        <div class="divider"></div>
        <div class="contain">
          <card
            v-for="article in articleListS.list.value"
            @click="router.push(`/user/article/${article.id}`)"
          >
            <div style="height: 80%; position: relative">
              <div class="title">
                {{ article.title }}
              </div>
              <img v-lazy="article.image" />
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
      </Card>
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
  @extend center;
}
.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(to left, #fff 5%, gainsboro 50%, #fff 85%);
}
.contain {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 45%;
    margin: 20px auto;
    height: 250px;
    transition: transform 0.5s;
    &:hover {
      transform: translateY(-10px);
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
