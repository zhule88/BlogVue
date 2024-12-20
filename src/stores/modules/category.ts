import { defineStore } from 'pinia'
import type {category} from '@/types'
import {categoryList,categoryArticleCount} from "@/api/modules/category"
import nameMap from "@/utils/nameMap"
export const useCategoryList =  defineStore('categoryList', ()=>{
  const list =reactive<category[] >([])
  const map = new nameMap();

  const init = async () =>{
    const res = await categoryList();
    list.push(... res.data)
    map.init(res.data)
  }
   const count = ()=>{
      return categoryArticleCount();
    }

  return{
    list,
    init,
    map,
    count
  }
})
