import { ref } from 'vue'
import type {category} from '@/types'
import {categoryList} from "@/api"
import nameMap from "@/utils/nameMap"
export class CategoryList{
  list= ref<category[]>([])
  map = new nameMap();
 /*  colorNums = [{backgroundColor:"#FFD700"},{backgroundColor:"#FF7F50"},
    {backgroundColor:"#FFA500"},{backgroundColor:"#FF69B4"},
   {backgroundColor:"#00008B"},{backgroundColor:" #8B0000"},
    {backgroundColor:" #4B0082"}
  ]
  random(){
    const Index = Math.floor(Math.random() * this.colorNums.length);
    return this.colorNums[Index];
  } */
  async init (){
    const res = await categoryList();
    this.list.value = res.data
    this.map.init(res.data)
  }
}
