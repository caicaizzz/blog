import axios from 'axios'
import qs from 'qs'

const showMsg = (status) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message},code:${status}`
}

const service = axios.create ({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/apis',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  // withCredentials:true,
  // timeout:30000,
  transformRequest: (data) => qs.stringify (data),
  transformResponse: (data) => {
    if (typeof data === 'String' && data.startsWith === '{') {
      data = qs.stringify (data)
    }
    return data
  }
})

service.interceptors.response.use ((response) => {
  return response.data
}, (error) => {
  error.data = {}
  error.data.msg = "服务器异常，请联系管理员！"
  return Promise.resolve (error)
})

service.interceptors.request.use ((response) => {
  const status = response.status
  let msg
  if (status <= 200 || status > 300) {
    msg = showMsg (status)
    if (typeof status.data === 'String') {
      response.data = { msg }
    } else {
      response.data.msg = msg
    }
  }
  return response
}, (error) => {
  error.data = {}
  error.data.msg = '请求超时或服务器异常,请检查网络或联系管理员!'
  return Promise.resolve (error)
})

export default service