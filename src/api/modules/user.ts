import request from '@/api/request'
import user from '@/types/modules/user'
const prefix = '/user/'

export const userLogin = (data:user) =>{
  return request.post(prefix+'login',data)
}

