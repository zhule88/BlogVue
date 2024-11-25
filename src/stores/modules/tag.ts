import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {tag,articletag} from '@/types'
import {tagList,articleTagGet,articleTagAdd,articleTagDel} from '@/api'
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
export const useArticleTag =  defineStore('articletag', ()=>{
  const list = ref<number[]>([])
  const get = async (id:number) =>{
   const res = await articleTagGet(id)
   list.value = res.data;


 }
 const add =  (id:number) =>{
  const data:articletag[] = [];
  list.value.forEach(item=>{
    const temp:articletag = {
      articleId:id,
      tagId:item
    }
    data.push(temp);
  })
  articleTagAdd(data);
}
   return{
    list,
     get,
     add,articleTagDel
   }
 })

