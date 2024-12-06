

import { fileList, fileUpload, fileDel,fileDelAll } from "@/api/modules/file";
import type { file } from "@/types";

export class File{
  list= ref<file[]>([]);
  articleId = ref(0);
  filename = ref("");
  async init(id?:number){
    if(id != undefined){
    this.articleId.value = id;
  }
    const res = await fileList(this.articleId.value);
    this.list.value = res.data;
  }
  async upload(file: any){
    const formData = new FormData();
    formData.append("file", file);
    return await fileUpload(formData,  this.articleId.value);
  }
   del (filename?:string){
    if(filename!=undefined){
      this.filename.value = filename;
    }
    fileDel(this.filename.value);
  }
   delAll(articleId?:number){
    if(articleId!=undefined){
      this.articleId.value = articleId;
    }
    fileDelAll(this.articleId.value);
  }
 }
