import { defineStore } from 'pinia'
import type user from '@/types/modules/user'
import  {userLogin,userRegister,userEmail,userAvatar,userInfo,userReset} from '@/api/modules/user'

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

   const login =async ()=>{
    const token = await userLogin(auth)
    if(token != 'error'){
      localStorage.setItem("token", token);
      return true;
    }
    return  false
   }

   const info = async ()=>{
    if( localStorage.getItem("token")){
      Object.assign(item, await userInfo());
      if(item.username == '筑乐'){
        sessionStorage.setItem("admin", 'true');

      }
    }
   }
  const avatar =async (file:globalThis.File)=>{
    const formData = new FormData();
    formData.append("file",file);
   if(auth.email == ''){
    auth.email = item.email
   }
   item.avatar = await  userAvatar(formData,auth.email)
  }
  const clear = ()=>{
    localStorage.removeItem("token");
    item.username = '';
    item.password = '';
    item.avatar = '';
    item.email = '';
    item.id = undefined;
   };

  return{
    item,auth,login,userEmail,userRegister,avatar,info,clear,userReset
  }
})


