import type user from '@/types/modules/user'
import {userListByIds} from "@/api/modules/user"
export class User{
  list:user[]  = [];
  map = new Map<number, user>();
  async listByIds(ids:number[]){
    this.list = await userListByIds(ids)
    if(this.list){
      this.list.forEach(l=>{
        this.map.set(l.id!,l)
      })
    }
  }
}

