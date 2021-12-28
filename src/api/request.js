import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

// axios.defaults.baseURL = 'http://localhost:9044/' // 需要放到最上面，否则不生效； 这里配置了proxy

const instance = axios.create({
  timeout: 60000
})

// 添加请求拦截器，在请求头中加token
instance.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })

// 拦截响应
instance.interceptors.response.use(
  res => {
    console.log(res)
    if (res.data.code === 200) {
      return res.data
    } else {
      Message.error(res.data.msg)
      return Promise.reject(res.data.msg)
    }
  },
  error => {
    console.log(error.response)
    if (error.response.data.code === 401) {
      localStorage.removeItem('Authorization')
      Message.error(error.response.data.msg)
      router.replace('/')
      return Promise.reject(error.response.data.data)
    } else {
      Message.error(error.response.data.data)
      return Promise.reject(error.response.data.msg)
    }
  }
)

// 请求post方式
const fetchPost = function (params) {
  return new Promise((resolve, reject) => {
    instance
      .post(params.url, params.data)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 请求get方式
const fetchGet = function (params) {
  return new Promise((resolve, reject) => {
    instance
      .get(params.url)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 请求DELETE方式
const fetchDelete = function (params) {
  return new Promise((resolve, reject) => {
    instance
      .delete(params.url)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default { fetchGet, fetchPost, fetchDelete }
