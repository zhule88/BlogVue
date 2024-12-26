import { createPinia } from 'pinia'
import { useCategoryList } from "@/stores/modules/category";
import { useArticle } from "@/stores/modules/article";
import {useTag} from "@/stores/modules/tag";
import {useTheme} from "@/stores/modules/theme";

const pinia = createPinia()

export default pinia
export {useCategoryList,useArticle, useTag,useTheme}

