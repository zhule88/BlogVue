import request from '@/utils/request'

export const articlePage = (current : number, size : number) =>{
return request.get('/article/page',{params:{
  current,size
}})
}

export const articleList = (state : number) =>{
  return request.get('/article/list',{params:{
    state
  }})
  }

