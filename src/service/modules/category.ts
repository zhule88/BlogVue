import { ref } from 'vue'
import type {category} from '@/types'
import {categoryList} from "@/api"
import nameMap from "@/utils/nameMap"
export class CategoryList{
  list= ref<category[]>([])
  map = new nameMap();
  async init (){
    const res = await categoryList();
    this.list.value = res.data
    this.map.init(res.data)
  }

}
