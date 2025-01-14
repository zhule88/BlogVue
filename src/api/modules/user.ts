import request from '@/api/request'

const prefix = '/user/'

export const userLogin = (data:any) =>{
  return request.post(prefix+'login',data)
}

export const userRegister = (data:any) =>{
  return request.post(prefix+'register',data)
}

export const userInfo = () =>{
  return request.get(prefix+'userInfo')
}
export const userReset = (data:any) =>{
  return request.post(prefix+'reset',data)
}
export const userEmail = (email:string) =>{
  return request.get(prefix+'email',{
    params:{
      email
    }
  })
}
export const userAvatar = (file:any,email?:string) =>{
  return request.post(prefix+'avatar',file,{
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params:{
      email
    }
  })
}

export const userListByIds = (ids:number[])=>{
  return request.post(prefix+'list/byIds',ids)
}
