import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fileList, fileUpload, fileDel,fileDelAll } from "@/api";
import type { file } from "@/types";



export const useFile =  defineStore('file', ()=>{
  const data = ref<file[]>([]);
  const articleId = ref(0);
  const list = async () =>{
    const res = await fileList(articleId.value);
    data.value = res.data;
  }
  const upload = async (file: any)=>{
    const formData = new FormData();
    formData.append("file", file);
    return await fileUpload(formData,  articleId.value);
  }
  const del = (filename:string)=>{
    fileDel(filename);
  }
  const delall= ()=>{

    fileDelAll(articleId.value);
  }
   return{
    data,
    list,
    upload ,
    del,
    delall,
    articleId
   }
 })
