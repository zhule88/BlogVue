import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {category} from '@/types'
import {categoryList} from "@/api"
export const useCategoryList =  defineStore('categoryList', ()=>{
  const data = ref<category[]>([])
  const get= async () =>{
    const res = await categoryList();
    data.value = res.data
  }
  return{
    data,
    get,
  }
})
