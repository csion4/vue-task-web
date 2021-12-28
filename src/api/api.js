import $http from './request'

export function httpPost (url, params) {
  if (!params) {
    params = {}
  }
  return $http.fetchPost({ url: url, data: params })
}

export function httpGet (url, params) {
  if (!params) {
    params = ''
  }
  return $http.fetchGet({ url: url + params })
}

export function httpDelete (url, params) {
  if (!params) {
    params = ''
  }
  return $http.fetchDelete({ url: url + params })
}

// 注册
export const REGISTER = '/sys/register'
// 登录
export const OA_LOGIN = '/sys/login'

// 注册loading使用
export const URLS = {
  OA_LOGIN,
  REGISTER
}
