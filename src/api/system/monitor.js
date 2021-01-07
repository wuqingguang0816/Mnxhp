import request from '@/utils/request'

// 获取列表
export function getSystemMonitor() {
  return request({
    url: '/api/system/System/Monitor',
    method: 'GET',
  })
}
