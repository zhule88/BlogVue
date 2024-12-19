import { fileList, fileUpload, fileDel,fileDelAll } from "@/api/modules/file";
import file from '@/types/modules/file'

export class File{
  list= ref<file[]>([]);

  filename = ref("");
  async init(articleId:number){

    const res = await fileList(articleId);
    this.list.value = res.data;
  }

  async upload(file: any,articleId?:number){
    const formData = new FormData();
    formData.append("file", file);
    return await fileUpload(formData, articleId);
  }
   del (filename?:string){
    if(filename!=undefined){
      this.filename.value = filename;
    }
    fileDel(this.filename.value);
  }
   delAll(articleId:number){
    fileDelAll(articleId);
  }
 }
