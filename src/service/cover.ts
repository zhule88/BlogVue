import { coverAdd, coverDel, coverList, coverUpdate } from '@/api/modules/cover';
import type cover from '@/types/modules/cover'
export class Cover{
  list:cover[] = [];
  async init (state?:number){
    this.list = await coverList(state);
  }
  del (id:number){
    coverDel(id);
  }
   add(file: globalThis.File){
    const formData = new FormData();
    formData.append("file",file );
    coverAdd(formData);
  }
  update(item:cover){
   if(item.state == 0){
    item.state = 1;
   }else{
    item.state = 0;
   }
   coverUpdate(item);
  }
}
