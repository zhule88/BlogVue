import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDel,  articleUpdate,articlePage} from "@/api";

export const useArticleList =  defineStore('articleTable', ()=>{
  const data = ref<article[]>([])
  const state = ref(2);
  const top= ref(3);
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
  const item = ref<article>({
    title:'',
    image:'',
    content:'',
    top:0,
  })
  const init = async(id:number)=>{
    const res = await articleGet(id );
    item.value = res.data
  }


  return{
    item ,
    init,
  }
})
