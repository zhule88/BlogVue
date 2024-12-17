import request from '@/api/request'
import article from '@/types/modules/article';

export const articlePage = (current : number, size : number,state:number) =>{
return request.get('/article/page',{params:{
  current,size,state
}})
}

export const articleList = (state ?: number,top ?:number) =>{
  return request.get('/article/list',{params:{
    state,
    top
  }})
}
export const articleAdd = (data:article) =>{
  return request.post('/article/add',data)
}
export const articleUpdate = (data:article) =>{
  return request.put('/article/update',data)
}
export const articleDel= (id:number) =>{
  return request.delete('/article/del',{
    params:{
      id
    }
  })
}
export const articleGet = (id:number) =>{
  return request.get('/article/get',{params:{
      id
    }
  })
}


export const articleAround = (id:number)=>{
  return request.get('/article/around',{params:{
    id
  }
})
}

export const articleListByIds = (ids:number[])=>{
  return request.post('/article/list/byIds',ids)
}
export const articleListByCateId= (id:number)=>{
  return request.get('/article/list/byCateId',{params:{
    id
  }
})
}
export const articleListByTagId = (id:number) =>{
  return request.get('/article/list/byTagId',{
    params:{
      id
    }
  })
}

