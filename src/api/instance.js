import axios from 'axios'
import { stringify } from 'qs'

// create an axios instance
const instance = axios.create({
  // baseURL: process.env.API_URL ||
  baseURL: 'https://pre.ugoloc.ucann.ru/api/cabinet/v1.0/', // api base_url
  paramsSerializer: function (params) {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.get['Accept'] = 'application/json'
instance.defaults.headers.get['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHJlLnVnb2xvYy51Y2Fubi5ydVwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU2Nzc2NTczOSwiZXhwIjoxNTY3ODUyMTM5LCJuYmYiOjE1Njc3NjU3MzksImp0aSI6IkxTckVtQTdJaDlhN2xaQXIiLCJzdWIiOjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VySWQiOjMsImxvZ2luIjoiYXJ0ZW0iLCJsYXN0bmFtZSI6Ilx1MDQyMFx1MDQzZVx1MDQzY1x1MDQzMFx1MDQzZFx1MDQzZVx1MDQzMiIsImZpcnN0bmFtZSI6Ilx1MDQxY1x1MDQzMFx1MDQ0MFx1MDQzYSIsIm1pZGRsZW5hbWUiOiIiLCJlbWFpbCI6ImFydGVtQHVnb2xvYy5ydSIsInBob25lIjoiNzkyNjMzNjAzMDUiLCJyb2xlcyI6WyJsb2dpbiIsImFkbWluIiwib3duZXIiLCJtYW5hZ2VyIl19.S13Qnb-2dvvtHE2ZwCxeQRb3nAjPDSTI6nBsQGJpCk4'

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
