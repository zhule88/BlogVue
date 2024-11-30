import request from '@/api/request'
import type {articletag} from '@/types'

export const tagList = () =>{
  return request.get('/tag/list')
}

export const articleTagGet = (id:number) =>{
  return request.get('/tag/articleTag/get',{
    params:{
      id
    }
  })
}
export const  articleTagAdd  = (data:articletag[]) =>{
  return request.post('/tag/articleTag/add',data)
}
export const  articleTagDel  = (id:number) =>{
  return request.delete('/tag/articleTagdel',{
    params:{
      id
    }
  })
}

export const articleGet = (id:number) =>{
  return request.get('/tag/article/get',{
    params:{
      id
    }
  })
}
