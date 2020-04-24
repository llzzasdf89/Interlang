import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://101.132.114.219:8888'
axios.interceptors.request.use(
  config => {
    const token = store.state.token || localStorage.getItem('token')
    if (config.url !== '/user/login') {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      }
    }
    return config
  },
  err => {
    return err
  }
)

export default {
  fetchFans: function () {
    return this.get('/user/fans')
  },
  fetchFriends () {
    return this.get('/user/partner')
  },
  etchUserInfo () {
    return this.get('/user/info')
  },
  getUserInLans () {
    this.get('/user/interestedLanguage').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  fetchFocus: function () {
    return this.get('/user/focus')
  },
  fetchTags () {
    this.get('tags/list').then(res => {
      if (res.success) {
        store.commit('updateTags', res.data)
      } else console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  fetchLanguages: function () {
    this.get('/language/list').then(res => {
      if (res.success) {
        const languages = res.data
        store.commit('updateLanguage', languages)
      }
    }).catch(err => {
      console.log(err)
    })
  },
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
