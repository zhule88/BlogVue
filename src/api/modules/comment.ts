import request from '@/api/request'
import type comment from "@/types/modules/comment"

const prefix = '/comment/'
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
