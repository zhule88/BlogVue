import request from '@/api/request'
import user from '@/types/modules/user'
const prefix = '/user/'

export const userLogin = (data:user) =>{
  return request.post(prefix+'login',data)
}

export const userRegister = (data:any) =>{
  return request.post(prefix+'register',data)
}
export const userEmail = (email:string) =>{
  return request.get(prefix+'email',{
    params:{
      email
    }
  })
}
export const userAvatar = (file:any,email:string) =>{
  return request.post('/file/add',file,{
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params:{
      email
    }
  })
}

