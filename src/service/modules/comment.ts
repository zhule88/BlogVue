import type comment from '@/types/modules/comment'


export class COmment {
  item:comment={
    content:'',
    browser:'',
    location:'',
    createTime:''
  }

  list:comment[] = [];
  map = new Map<number,comment[]>();

  current = 1;

  isMore = true;

  async page(){
      const res = await commentListByArticle(this.item.articleId!,this.current);
      this.list.push(...res);

      if(res.length<10){
        this.isMore = false;
      }


   /*  res.forEach((c:comment)=>{
        if(this.map.has(c.parentId)){
          this.map.get(c.parentId)!.push(c);
        }else{
          this.map.set(c.parentId,[c])
        }
    }) */
  }
  count(id: number){
        return commentCount(id)
  }
  async add(){
    await commentAdd(this.item)
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
