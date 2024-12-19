import type link from '@/types/modules/link'
import {linkList,linkAdd,linkUpdate,linkDel} from '@/api/modules/link'
export class LinkList{
  list  = reactive<link[]>([])
  async init(){
    const res = await linkList()
    this.list = res.data;
  }
}
export class Link{
  item = reactive<link>({
nickname:'',
address:'',
state:0,
avatar:'',
description:'',
email:''
  })
  add(){
    linkAdd(this.item);
  }
  update(){
  linkUpdate(this.item);
  }
  del(id:number){
    linkDel(id)
  }
}
