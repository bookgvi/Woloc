import axios from 'axios'
import { stringify } from 'qs'
import { LocalStorage, Notify } from 'quasar'

const loginInstance = axios.create({
  // baseURL: process.env.API_URL ||
  baseURL: 'https://pre.ugoloc.ucann.ru/api/', // api base_url
  paramsSerializer: function (params) {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})

loginInstance.defaults.headers.post['Content-Type'] = 'application/json'
loginInstance.defaults.headers.get['Accept'] = 'application/json'

// request interceptor
loginInstance.interceptors.request.use(
  conf => {
    // Do something before request is sent
    const token = LocalStorage.getItem('user-token')
    if (token) {
      conf.headers['Authorization'] = `Bearer ${token}`
    }
    return conf
  },
  error => {
    // Do something with request error
    // console.log('request error: ', error) // for debug
    Promise.reject(error)
  })

// response interceptor
loginInstance.interceptors.response.use(
  response => response,
  error => {
    const response = error.response
    // console.info('response error', response.data)// for debug
    if (response) {
      switch (response.status) {
        case 401:
        case 403:
          LocalStorage.remove('user-token')
          window.location.href = `/login`
          break
        default:
          if (response.data && response.data.errors) {
            if (Array.isArray(response.data.errors)) {
              response.data.errors.forEach(err => {
                Notify.create({
                  message: err.message,
                  color: 'negative',
                  position: 'bottom-left',
                  icon: 'warning'
                })
              })
            } else {
              Notify.create({
                message: response.data.errors.message,
                color: 'negative',
                position: 'bottom-left',
                icon: 'warning'
              })
            }
          }
      }
      // return response.data
    }
    return Promise.reject(response.data)
  }
)

export default loginInstance
