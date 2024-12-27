import { defineStore } from 'pinia'
import type user from '@/types/modules/user'
import  {userLogin} from '@/api/modules/user'

export const useUser =  defineStore('user', ()=>{
   const item = reactive<user>({
    username: '',
  password: '',
  avatar:'',
  email: '',
  intro:''
   })

   const login =()=>{
    userLogin(item)
   }


  return{
    item,login
  }
})
