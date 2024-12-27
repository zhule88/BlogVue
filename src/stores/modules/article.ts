import { defineStore } from 'pinia'
import type {article} from '@/types'
import {articleGet, articleAdd, articleDel,
  articleUpdate,
  } from "@/api/modules/article";

export const useArticle =  defineStore('article', ()=>{
  const item = reactive<article>({
    title:'',
    image:'',
    content:'',
    top:0,
    visitCount:0
  })
  const init = async(id:number)=>{
    const res = await articleGet(id);
    Object.assign(item, res.data);

    item.image = prefix+item.image
  }
  const add=()=>{
    articleAdd(item);
 }
 const update =()=>{
   articleUpdate(item );
 }
 const del =()=>{
 articleDel(item.id! )
 }
 const clear = ()=>{
 item.title = '';
 item.image = '';
 item.content = '';
 item.top = 0;
 item.visitCount = 0;
};


  return{
    item ,
    init,
    add,
    update,
    del,
    clear
  }
})
