import { defineStore } from 'pinia'
import type {article} from '@/types'
import {articleGet, articleAdd, articleDel,
  articleUpdate,
  } from "@/api/modules/article";

export const useArticle =  defineStore('article', ()=>{
  const item = ref<article>({
    title:'',
    image:'',
    content:'',
    top:0,
  })
  const init = async(id:number)=>{
    const res = await articleGet(id );
    item.value = res.data
    item.value.image = prefix+item.value.image

  }
  const add=()=>{
    articleAdd(item.value);
 }
 const update =()=>{
   articleUpdate(item .value);
 }
 const del =()=>{
 articleDel(item .value.id! )
 }
 const clear = ()=>{
  item .value = {
     title:'',
     image:'',
     content:'',
     top:0,
   }
 }

  return{
    item ,
    init,
    add,
    update,
    del,
    clear
  }
})
