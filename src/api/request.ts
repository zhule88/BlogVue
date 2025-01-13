import axios from 'axios'
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";

const baseURL = 'http://localhost:8000/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
   (config)=> {
    config.headers.Authorization= localStorage.getItem('token');
    return config
  },
   (error)=> {
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
   (response) =>{
    if (response.data.code == 1) {
      return response.data.data;
    }
    if (response.data.code != 1) {
      ElMessage.error(response.data.msg)
    }
    return Promise.reject(response.data.msg)
  },
   (error) =>{
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

export default instance

export { baseURL }



