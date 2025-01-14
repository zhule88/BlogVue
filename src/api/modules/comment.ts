import request from '@/api/request'
import type comment from "@/types/modules/comment"

const prefix = '/comment/'
export const commentListByArticle = (id:number) =>{
  return request.get(prefix+ 'list/byArticle',{
    params: {
      id
    }
  })
}

export const commentAdd = (data:comment) =>{
  return request.post(prefix+ 'add',data)
}
export const commentdel = (id:number) =>{
  return request.delete(prefix+ 'del',{
    params:{
      id
    }
  })
}
