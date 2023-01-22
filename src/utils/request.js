import axios from 'axios'
import qs from 'qs'

const service = axios.create ({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/apis',
  // headers: {
  //   get: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //   },
  //   post: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   }
  // },
  // withCredentials:true,
  timeout:30000,
  transformRequest: (data) => qs.stringify (data),
  transformResponse: (data) => {
    if (typeof data === 'String' && data.startsWith === '{') {
      data = qs.stringify (data)
    }
    return data
  }
})

service.interceptors.request.use ((config) => {
  const token=localStorage.getItem('token')
  token&&(config.headers.token=token)
  let language=localStorage.setItem('locale')
  if(language&&language==='zh'){
    language='zh-cn'
  }
  language&&(config.headers['Accept-Language']=language)
  return config
}, (error) => {
  return Promise.reject (error)
})

service.interceptors.response.use ((response) => {
  return response.data
}, (error) => {
  return Promise.reject (error)
})

export default service