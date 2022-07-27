import request from '@/utils/request'

// 获取用户授权列表
export const getSocialsUserList = (data) => {
  return request({
    url: '/api/permission/socials',
    method: 'GET',
    data
  })
}

// 获取用户授权列表
export const binding = (data) => {
  return request({
    url: `/api/permission/socials/render/${data}`,
    method: 'GET',
  })
}

// 解绑
export const deleteSocials = (id) => {
  return request({
    url: `/api/permission/socials/${id}`,
    method: 'DELETE',
  })
}