import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {tag} from '@/types'
import {tagList} from '@/api/modules/tag'
import nameMap from "@/utils/nameMap"

export const useTag =  defineStore('tag', ()=>{
 const list = ref<tag[]>([])
 const map = new nameMap();

 const init = async () =>{
  const res = await tagList()
  list.value = res.data
  map.init(res.data)
  }

  return{
    list,
    init,
    map
  }
})
