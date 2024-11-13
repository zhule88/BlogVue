import request from '@/api/request'

export const tagList = () =>{
  return request.get('/tag/list')
}

export const articleTagGet = (id:number) =>{
  return request.get('/tag/article/get',{
    params:{
      id
    }
  })
}
export const  articleTagAdd  = (ids:number[],id:number) =>{
  return request.get('/tag/article/add',{
    params:{
      ids,
      id
    }
  })
}
