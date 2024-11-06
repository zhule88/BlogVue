import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from "vue";
import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDel,  articleUpdate,fileDelAll, articlePage} from "@/api";

export const useArticleList =  defineStore('articleTable', ()=>{
  const data = ref<article[]>([])
  const state: Ref = ref(2);
  const top: Ref = ref(3);
  const total = ref(0)
  const current = ref(1);
  const size = ref(5);
  const get = async () =>{
    const res = await articleList(state.value,top.value);
    data.value = res.data
  }
  const page = async () =>{
    const res = await articlePage(current.value, size.value,state.value);
    total.value = res.data.total;
    data.value = res.data.records;
  }
  return{
    data,
    get,
    total,
    page,
    top,
    state,
    current,
    size
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
