'use strict'

import axios from 'axios'
import store from '@/store'
import { getToken } from './storage'

const enabledToken = Boolean(process.env.VUE_APP_ENABLED_TOKEN)
const requestWhiteList = JSON.parse(process.env.VUE_APP_API_WHITE_LIST)
export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 20000
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
// instance.defaults.headers.post['cache-control'] = 'no-cache'

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    let pass = Boolean(requestWhiteList.find(w => config.url.includes(w)))
    if (pass) {
      return config
    }
    if (config.url.startsWith('http') && !config.url.includes(config.baseURL)) {
      return config
    }
    if (enabledToken) {
      let localToken = getToken()
      if (localToken) {
        config.headers.Authorization = localToken
      } else {
        store.dispatch('login/loginOut').then()
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (r) => {
    let { status, data, config } = r
    if (status === 200) {
      // 判断是否为文件流
      if (data && (Object.getPrototypeOf(data).toString() === '[object ArrayBuffer]')) {
        return Promise.resolve({
          status: 0,
          message: '',
          data: data
        })
      }
      if (config.url.startsWith('http') && !config.url.includes(config.baseURL)) {
        return Promise.resolve(data)
      }
      if (data.success) {
        return Promise.resolve(data)
      }
    }
    return Promise.reject(data)
  },
  (error) => {
    if (error.response) {
      let status = error.response.status
      if (status === 401) {
        console.log('401')
        store.dispatch('login/loginOut').then()
      }
    }
    return Promise.reject(error)
  }
)

export default { instance }
