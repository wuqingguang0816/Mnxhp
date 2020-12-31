import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/api/Common/Login/Login',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export function getInfo() {
  return request({
    url: '/api/Common/Login/CurrentUser',
    method: 'get',
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/api/Common/Login/Logout',
    method: 'get'
  })
}

// 锁屏解锁登录
export function unlock(data) {
  return request({
    url: '/api/Common/Login/LockScreen',
    method: 'post',
    data
  })
}