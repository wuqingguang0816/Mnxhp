import request from '@/utils/request'

// 获取系统日志信息
export function getLogList(id, data) {
  return request({
    url: `/api/System/Log/${id}`,
    method: 'GET',
    data
  })
}

// 删除或批量删除日志
export function delLog(data) {
  return request({
    url: '/api/System/Log',
    method: 'DELETE',
    data
  })
}
