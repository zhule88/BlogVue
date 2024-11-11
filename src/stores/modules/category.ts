import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {category} from '@/types'
import {categoryList} from "@/api"
export const useCategoryList =  defineStore('categoryList', ()=>{
  const data = ref<category[]>([])
  const map = new Map();
  const name = ref('二比');

  const list= async () =>{
    const res = await categoryList();
    data.value = res.data
  }
  const mapGet = async () =>{
    await list();
    for (let i of data.value) {
      map.set(i.id,i.name);

    }
  }
  const nameGet = (id:number | undefined) =>{
    return map.get(id);

  }
  return{
    data,
    list,
    mapGet,
    nameGet,
    name,
    map,

  }
})
