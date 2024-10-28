import request from '@/utils/request'

export const imageDelete = (filename:string) =>{
  return request.delete('/image/cover/delete',{
    params:{
      filename
    }
  })
}
