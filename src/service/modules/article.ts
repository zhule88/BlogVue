import { ref} from 'vue'
import type {article} from '@/types'
import {articleGet, articleAdd, articleList, articleDel,
   articleUpdate,articlePage,articleAround,
   articleListByIds,articleListByCateId} from "@/api/modules/article";

export class ArticleList {
  list = ref<article[]>([]);
  state = ref(2);
  top= ref(3);
  total = ref(0)
  current = ref(1);
  size = ref(10);

  async init (){
    const res = await articleList(this.state.value,this.top.value);
    this.list.value = res.data
  }
  async page (){
    const res = await articlePage(this.current.value, this.size.value,this.state.value);
    this.total.value = res.data.total;
    this.list.value = res.data.records;
  }

  async around(id:number){
    const res = await articleAround(id)
    this.list.value = res.data;
  }
  async listByIds(ids:number[]){
    const res = await articleListByIds(ids)
    this.list.value = res.data;
  }
  async listByCateId(id:number){
    const res = await articleListByCateId(id)
    this.list.value = res.data;
  }
}

export class Article{
  item = ref<article>({
    title:'',
    image:'',
    content:'',
    top:0,
  })
  async init (id:number){
    const res = await articleGet(id);
    this.item .value = res.data
  }
    add(){
     articleAdd(this.item .value);
  }
    update(){
    articleUpdate(this.item .value);
  }
  async del() {
   await articleDel(this.item .value.id! )
  }

  clear(){
  this.item .value = {
      title:'',
      image:'',
      content:'',
      top:0,
    }
  }
}
