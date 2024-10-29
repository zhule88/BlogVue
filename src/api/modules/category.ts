import request from '@/api/request'

export const categoryList = () =>{
  return request.get('/category/list')
}
