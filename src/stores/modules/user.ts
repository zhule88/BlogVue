import { defineStore } from 'pinia'
import type user from '@/types/modules/user'
import  {userLogin,userRegister,userEmail,userAvatar,userInfo} from '@/api/modules/user'

export const useUser =  defineStore('user', ()=>{
   const item = reactive<user>({
    username: '',
    password: '',
    avatar:'',
    email: '',
   })


   const auth = reactive({
    ...item,
    repassword:'',
    code:''
   })


   const register=  ()=>{
   return  userRegister(auth)
   }
   const login =async ()=>{
    const token = await userLogin(auth)
    if(token != 'error'){
      localStorage.setItem("token", token);
      return true;
    }
    return  false
   }

   const info = async ()=>{
    Object.assign(item, await userInfo());

   }

   const email = ()=>{
    userEmail(auth.email);
   }
  const avatar =(file:globalThis.File)=>{
    const formData = new FormData();
    formData.append("file",file);
    userAvatar(formData,auth.email)
  }

  return{
    item,auth,login,email,register,avatar,info
  }
})
