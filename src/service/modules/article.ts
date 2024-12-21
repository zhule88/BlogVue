import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDel,
   articleUpdate,articlePage,articleAround,
   articleListByIds,articleListByCateId,articleListByTagId} from "@/api/modules/article";


export class ArticleList {
  list:article[] =[];
  state = 2;
  top= 3;
  total = 0
  current = 1;
  size = 10;

  addPrefix(){
    this.list.forEach(item =>{
      item.image = prefix+item.image
    })
  }
  async init (){
    const res = await articleList(this.state,this.top);
    this.list = res.data;
    this.addPrefix();
  }
  async page (){
    const res = await articlePage(this.current, this.size,this.state);
    this.total = res.data.total;
    this.list = res.data.records;

    this.addPrefix();

  }

  async around(id:number){
    const res = await articleAround(id)
    this.list = res.data;
    this.addPrefix();
  }
  async listByIds(ids:number[]){
    const res = await articleListByIds(ids)
    this.list = res.data;
    this.addPrefix();
  }
  async listByCateId(id:number){
    const res = await articleListByCateId(id)
    this.list = res.data;
    this.addPrefix();
  }
  async listByTagId(id:number){
    const res = await articleListByTagId(id)
    this.list = res.data;
    console.log(this.list );
    this.addPrefix();
  }
}

export class Article{
  item: article= {
    title:'',
    image:'',
    content:'',
    top:0,
    visitCount:0
  }
  async init (id:number){
    const res = await articleGet(id);
    this.item = res.data
    this.item.image = prefix+this.item.image

  }
    add(){
     articleAdd(this.item );
  }
    update(){
    articleUpdate(this.item );
  }
  async del() {
   await articleDel(this.item.id! )
  }



  clear(){
  this.item  = {
      title:'',
      image:'',
      content:'',
      top:0,
      visitCount:0
    }
  }
}
