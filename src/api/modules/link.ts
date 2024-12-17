import request from '@/api/request'
import link from '@/types/modules/link';

const prefix = '/link/';

export const linkList = () =>{
  return request.get(prefix + 'list');
}

export const linkAdd = (data:link) =>{
  return request.post(prefix +'add',data)
}

export const linkUpdate = (data:link) =>{
  return request.put(prefix +'update',data)
}

export const linkDel = (id:number) =>{
  return request.delete(prefix +'del',{
    params:{
      id
    }
  })
}
