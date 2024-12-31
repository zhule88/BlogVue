import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDel,
   articleUpdate,articlePage,articleAround,
   articleListByIds,articleListByCateId,articleListByTagId} from "@/api/modules/article";


export class ArticleList {
  list:article[] =[];
  state = 1;
  top= 3;
  total = 0
  current = 1;
  size = 10;

  addPrefix(){
    this.list.forEach(item =>{
      item.image = prefix+item.image;
    })
  }
  async init (){
    this.list  = await articleList(this.state,this.top);


    this.addPrefix();
  }
  async page (){
    const res = await articlePage(this.current, this.size,this.state);

    this.total = res.total;
    this.list = res.records;
    this.addPrefix();

  }

  async around(id:number){
    this.list  = await articleAround(id)
    if(this.list[0] != null){
      this.list[0].image =  prefix+ this.list[0].image;
    }
    if(this.list[1] != null){
      this.list[1].image =  prefix+ this.list[1].image;
    }
  }
  async listByIds(ids:number[]){
    this.list = await articleListByIds(ids);
    this.addPrefix();
  }
  async listByCateId(id:number){
    this.list  = await articleListByCateId(id)
    this.addPrefix();
  }
  async listByTagId(id:number){
    this.list = await articleListByTagId(id)
    this.addPrefix();
  }
}

/* export class Article{
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
} */
