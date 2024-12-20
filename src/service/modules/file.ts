import { fileList, fileUpload, fileDel,fileDelAll } from "@/api/modules/file";
import file from '@/types/modules/file'

export class File{
  list:file[] = [];

  filename = '';
  async init(articleId:number){

    const res = await fileList(articleId);
    this.list = res.data;

  }

  async upload(file: any,articleId?:number){
    const formData = new FormData();
    formData.append("file", file);
    return await fileUpload(formData, articleId);
  }
   del (filename?:string){
    if(filename!=undefined){
      this.filename = filename;
    }
    fileDel(this.filename);
  }
   delAll(articleId:number){
    fileDelAll(articleId);
  }
 }
