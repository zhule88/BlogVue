import request from '@/api/request'


export const imageDelete = (filename:string,id:number) =>{
  return request.delete('/image/delete',{
    params:{
      filename,
      id
    }
  })
}
export const articleUpload = (file: any,id?:number) =>{
  return request.post('/image/article/upload',file,{
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params:{
      id
    }
  })
}
export const init = ()=>{
  return request.post('/image/article/init')
}

export const mkdirChange = (id:number)=>{
  return request.get('/image/article/mkdir',{
    params:{
     id
    }
  })
}
export const mkdirDel = (id:number)=>{
  return request.get('/image/article/mkdirdel',{
    params:{
     id
    }
  })
}

export const list= (id:number | undefined)=>{
  return request.get('/image/list',
    {
      params:{
       id
      }
    }
  )
}
