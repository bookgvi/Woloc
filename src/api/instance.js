import axios from 'axios'

// create an axios instance
const instance = axios.create({
  // baseURL: process.env.API_URL ||
  baseURL: 'https://pre.ugoloc.ucann.ru/admin/api/v1.0/', // api base_url
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.get['Accept'] = 'application/json'

// response interceptor
instance.interceptors.response.use(
  response => {
    // console.info('response success', response)// for debug
    return response
  },
  error => {
    const response = error.response
    return Promise.reject(response.data)
  }
)
export default instance
