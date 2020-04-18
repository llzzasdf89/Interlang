import axios from 'axios'
import router from '@/router/index'
import qs from 'qs'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://101.132.114.219:8888'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    const fd = new FormData()
    fd.append('username', config.data.username)
    fd.append('password', config.data.password)
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
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
      axios.post(url, qs.stringify(data))
        .then(response => {
          resolve(response)
        }).catch(err => reject(err))
    })
  }
}
