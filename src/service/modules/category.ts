import type {category} from '@/types'
import {categoryList,categoryArticleCount} from "@/api/modules/category"

export class CategoryList{
  list = reactive<category[]>([])
  map = new nameMap();
  async init (){
    const res = await categoryList();
    this.list = res.data
    this.map.init(res.data)
  }

  count(){
    return categoryArticleCount();
  }
}
