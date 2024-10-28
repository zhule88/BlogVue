import { defineStore } from 'pinia'
import { ref } from 'vue'
import category from '@/types/category'
import {categoryList} from "@/api/category"
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
