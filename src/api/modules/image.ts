import request from '@/api/request'
import { AxiosRequestConfig } from 'axios'

export const imageDelete = (filename:string) =>{
  return request.delete('/image/cover/delete',{
    params:{
      filename
    }
  })
}
export const articleUpload = (file: AxiosRequestConfig<any> | undefined) =>{
  return request.post('/image/article/upload',file)
}
