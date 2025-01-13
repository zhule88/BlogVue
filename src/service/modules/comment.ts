import type comment from '@/types/modules/comment'
import {commentAdd,commentdel} from "@/api/modules/comment"

export class COmment {
  item:comment={
    content:'',
    bowser:'',
    location:'',
    createTime:''
  }
  add(){
    commentAdd(this.item)
  }
  del(id:number){
    commentdel(id)
  }
}
