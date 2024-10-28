import { createPinia } from 'pinia'
import { useCategoryList } from "@/stores/modules/category";
import { useArticleList, useArticle } from "@/stores/modules/article.ts";

const pinia = createPinia()

export default pinia
export {useCategoryList,useArticleList, useArticle}
