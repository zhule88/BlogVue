import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from "vue";
import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDel,  articleUpdate,fileDelAll} from "@/api";

export const useArticleList =  defineStore('articleTable', ()=>{
  const data = ref<article[]>([])
  const state: Ref = ref(3);
  const get = async () =>{
    const res = await articleList(state.value);
    data.value = res.data
  }
  return{
    data,
    get,
  }
})
export const useArticle =  defineStore('article', ()=>{
  const data = ref<article>({
    title:'',
    image:'',
    content:'',
    top:0,
  })
  const get  = async(id:number)=>{
    const res = await articleGet(id );
    data.value = res.data
  }
  const add  = async ()=>{
     await articleAdd(data.value);
  }
  const update = ()=>{
    articleUpdate(data.value);
  }
  const del = async (id:number)=>{
  await articleDel(id);
   fileDelAll(id)

  }
  const clear = ()=>{
    data.value = {
      title:'',
      image:'',
      content:'',
      state:0,
      top:0,
    }
  }


  return{
    data,
    del,
    get,
    add,
    update,
    clear
  }
})
