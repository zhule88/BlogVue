import type article from '@/types/modules/article'
export class ArticleList {
  list:article[] =[{
    title: '',
    image: '',
    content: '',
    top: 0,
    visitCount: 0
  },{
    title: '',
    image: '',
    content: '',
    top: 0,
    visitCount: 0
  },{
    title: '',
    image: '',
    content: '',
    top: 0,
    visitCount: 0
  }];
  state = 1;
  top= 3;
  total = 0
  current = 1;
  size = 10;

  async init (){
    this.list  = await articleList(this.state,this.top);
  }

  async page (){
    const res = await articlePage(this.current, this.size,this.state);
    this.total = res.total;
    this.list = res.records;
  }

  async around(id:number){
    this.list  = await articleAround(id)
  }
  async listByIds(ids:number[]){
    this.list = await articleListByIds(ids);
  }
  async listByCateId(id:number){
    this.list  = await articleListByCateId(id)

  }
  async listByTagId(id:number){
    this.list = await articleListByTagId(id)
  }
}
/*
export class Article{
  item: article= {
    title:'',
    image:'',
    content:'',
    top:0,
    visitCount:0
  }
  async init (id:number){
    this.item = await articleGet(id);
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
