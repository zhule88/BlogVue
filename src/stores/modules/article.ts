import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from "vue";
import article from '@/types/article.ts'
import { articleList, articleDelete, imageDelete } from "@/api/article";

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
  const data = ref<article>()
  const del = async (id:number,image:string)=>{
  await articleDelete(id);
  await imageDelete(image);
  }
  const imgGet = (img:string)=>{
    const bef = "../../../../public/image/";
    return bef + img;
  }
  return{
    data,
    del,
    imgGet
  }
})
