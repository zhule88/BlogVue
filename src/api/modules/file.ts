import request from '@/api/request'

export const fileList = (id:number) =>{
  return request.get('/file/list',{
    params:{
      id
    }
  })
}
export const fileUpload = (file:any,id:number) =>{
  return request.post('/file/add',file,{
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params:{
      id
    }
  })
}
export const fileDel = (filename:string) =>{
  return request.delete('/file/del',{
    params:{
     filename
    }
  })
}
export const fileDelAll = (id:number) =>{
  return request.delete('/file/delall',{
    params:{
    id
    }
  })
}
