import request from '@/utils/request'

export const articleList = (current : number, size : number) =>{
return request.get('/article/list',{params:{
  current,size
}})
}
