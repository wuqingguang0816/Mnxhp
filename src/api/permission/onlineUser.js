import request from '@/utils/request'

// 获取在线用户列表
export const getOnlineUser = (data) => {
  return request({
    url: '/api/Permission/Users/Online',
    method: 'GET',
    data
  })
}
// 强制下线
export const deleteOnlineUser = (id) => {
  return request({
    url: `/api/Permission/Users/Online/${id}`,
    method: 'DELETE'
  })
}
