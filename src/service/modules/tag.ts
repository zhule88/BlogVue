import { ref } from 'vue'
import type {tag,articletag} from '@/types'
import {tagList,articleTagGet,articleTagAdd,articleTagDel} from '@/api'
import nameMap from "@/utils/nameMap"

export class Tag{
list = ref<tag[]>([])
map = new nameMap();
async init (){
  const res = await tagList()
  this.list.value = res.data
  this.map.init(res.data)
  }
}

export class ArticleTag {
 list = ref<number[]>([]);
 async init (id:number){
   const res = await articleTagGet(id)
   this.list.value = res.data;
 }

  add (id:number) {
  const data:articletag[] = [];
  this.list.value.forEach((item: number)=>{
  const temp:articletag = {
      articleId:id,
      tagId:item
    }
    data.push(temp);
  })
  articleTagAdd(data);
}
del(id:number){
  articleTagDel(id)
}
update(id:number){
  this.add(id);
  articleTagDel(id);
}
}
