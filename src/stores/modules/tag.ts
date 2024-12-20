import { defineStore } from 'pinia'

import type {tag} from '@/types'
import {tagList} from '@/api/modules/tag'
import nameMap from "@/utils/nameMap"

export const useTag =  defineStore('tag', ()=>{
  const list = reactive<tag[]>([])
 const map = new nameMap();

 const init = async () =>{
  const res = await tagList() as any;
  list.push(... res.data)

  map.init(res.data)
  }

  return{
    list,
    init,
    map
  }
})
