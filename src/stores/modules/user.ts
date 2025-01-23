import { defineStore } from 'pinia'
import type user from '@/types/modules/user'
import  {userLogin,userRegister,userEmail,userAvatar,userInfo,userReset} from '@/api/modules/user'

export const useUser =  defineStore('user', ()=>{
   const item = reactive<user>({
    username: '',
    password: '',
    avatar:'',
    email: '',
     repassword:'',
    code:''
   })



   const login =async ()=>{
    const token = await userLogin(item)
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
  const avatar =async (file:File)=>{
    const formData = new FormData();
    formData.append("file",file);
   item.avatar = await  userAvatar(formData,item.email)
  }
  const clear = ()=>{
    sessionStorage.removeItem('admin')
    localStorage.removeItem("token");
    item.id = undefined;
    item.username = '';
    item.password = '';
    item.avatar = '';
    item.email = '';
    item.code = '';
    item.repassword = '';
   };

  return{
    item,login,userEmail,userRegister,avatar,info,clear,userReset
  }
})


