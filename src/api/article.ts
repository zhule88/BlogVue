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
export const articleAdd = (data:any) =>{
  return request.post('/article/add',data)
}
export const articleUpdate = (data:any) =>{
  return request.put('/article/update',data)
}
export const articleDelete= (id:number) =>{
  return request.delete('/article/delete',{
    params:{
      id
    }
  })
}
export const articleGet = (id:number) =>{
  return request.get('/article/get',{
    params:{
      id
    }
  })
}
export const imageDelete = (filename:string) =>{
  return request.delete('/cover/delete',{
    params:{
      filename
    }
  })
}
