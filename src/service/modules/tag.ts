import { ref } from 'vue'
import type {tag} from '@/types'
import {tagList} from '@/api/modules/tag'
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


