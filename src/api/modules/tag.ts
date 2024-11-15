import request from '@/api/request'
import type {articletag} from '@/types'

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
export const  articleTagAdd  = (data:articletag[]) =>{
  return request.post('/tag/article/add',data)
}
export const  articleTagDel  = (id:number) =>{
  return request.delete('/tag/article/del',{
    params:{
      id
    }
  })
}
