import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {category} from '@/types'
import {categoryList} from "@/api/modules/category"
import nameMap from "@/utils/nameMap"
export const useCategoryList =  defineStore('categoryList', ()=>{
  const list = ref<category[]>([])
  const map = new nameMap();

  const init = async () =>{
    const res = await categoryList();
    list .value = res.data
    map.init(res.data)
  }

  return{
    list,
    init,
    map,
  }
})
