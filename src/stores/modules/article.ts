import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from "vue";
import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDelete, imageDelete, articleUpdate } from "@/api";

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
    id:0,
    categoryId:1,
    title:'',
    image:'',
    content:'',
    state:0,
    top:0,

  })
  const get  = async(id:number)=>{
    const res = await articleGet(id );
    data.value = res.data
  }
  const add  = ()=>{
     articleAdd(data.value);
  }
  const update = ()=>{
    articleUpdate(data.value);
  }
  const del = async (id:number,image:string)=>{
  await articleDelete(id);
   imageDelete(image);
  }
  const clear = ()=>{
    data.value = {
      id:0,
      categoryId:1,
      title:'',
      image:'',
      content:'',
      state:0,
      top:0,
    }
  }

  const imgGet = (img:string)=>{
    const bef = "../../../../public/image/";
    return bef + img;
  }
  return{
    data,
    del,
    imgGet,
    get,
    add,
    update,
    clear
  }
})
