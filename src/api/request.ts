import axios, { AxiosResponse } from 'axios'
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

interface res {
  code: number
  message: string
  data: any
}

const get =  (url: string, params: object = {}): Promise<AxiosResponse<res>>=> {
  return  instance.get(url, { params })
}
const post =  (url: string, data: object): Promise<AxiosResponse<res>> => {
  return  instance.post(url, data)
}
const put =  (url: string, data: object): Promise<AxiosResponse<res>> => {
  return  instance.put(url, data)
}
const del =  (url: string, params: object = {}) : Promise<AxiosResponse<res>>=> {
  return  instance.delete(url, { params })
}
export  {
  get,
  post,
  put,
  del
}
