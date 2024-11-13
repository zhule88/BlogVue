import { createPinia } from 'pinia'
import { useCategoryList } from "@/stores/modules/category";
import { useArticleList, useArticle } from "@/stores/modules/article";
import {useTag, useArticleTag  } from "@/stores/modules/tag";
import {useFile } from "@/stores/modules/file";
const pinia = createPinia()

export default pinia
export {useCategoryList,
  useArticleList, useArticle,
  useTag, useArticleTag,
  useFile  }
