import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {article} from '@/types'
import {articleGet} from "@/api/modules/article";


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
