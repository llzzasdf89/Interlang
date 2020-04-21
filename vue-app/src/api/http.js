import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://101.132.114.219:8888'
axios.interceptors.request.use(
  config => {
    if (config.url === '/user/login') {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } else {
      const token = store.state.token || ''
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      }
    }
    console.log(config)
    return config
  },
  err => {
    console.log(err)
  }
)

export default {
  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, qs.stringify(params))
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
