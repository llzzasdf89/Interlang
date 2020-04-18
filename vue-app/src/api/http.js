import axios from 'axios'
import router from '@/router/index'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://101.132.114.219:8888'
axios.defaults.withCredentials = true
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.headers = {
      'Content-Type': 'multipart/form-data'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode === 2) {
      router.push({
        path: '/',
        query: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export default {
  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          console.log(response)
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
}
