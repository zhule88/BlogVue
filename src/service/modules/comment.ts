import type comment from '@/types/modules/comment'
import {commentAdd,commentdel,commentListByArticle} from "@/api/modules/comment"

export class COmment {
  item:comment={
    content:'',
    browser:'',
    location:'',
    createTime:''
  }
  list:comment[] = [];

  async init(){
    this.list = await commentListByArticle(this.item.articleId!);
  }
  add(){
    commentAdd(this.item)
  }
  del(id:number){
    commentdel(id)
  }

  clear(){
    this.item={
      content:'',
      browser:'',
      location:'',
      createTime:''
    }
  }
}
