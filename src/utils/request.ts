import axios from 'axios'
const baseURL = 'http://localhost:8000/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data.code == 1) {
      return response.data
    }
    return Promise.reject(response.data)
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
