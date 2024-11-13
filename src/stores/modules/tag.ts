import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {tag,articletag} from '@/types'
import {tagList,articleTagGet,articleTagAdd} from '@/api'


export const useTag =  defineStore('tag', ()=>{
 const list = ref<tag[]>([])

 const map = new Map();
 const listGet = async () =>{
  const res = await tagList()
  list.value = res.data

  }
  const mapGet = async ()=>{
    await listGet()
    for (let i of list.value) {
      map.set(i.id,i.name);
    }
}
const nameGet = (id:number) =>{

  return map.get(id);
}
  return{
    list,
    listGet,
    mapGet ,
    nameGet
  }
})
export const useArticleTag =  defineStore('articletag', ()=>{

  const list = ref<number[]>([])
  const get = async (id:number) =>{
   const res = await articleTagGet(id)
   list.value = res.data;
 }
 const add =  (id:number) =>{
  articleTagAdd(list.value,id);
}
   return{
    list,
     get,
     add
   }
 })
