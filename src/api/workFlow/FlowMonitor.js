import request from '@/utils/request'

export function FlowMonitorList(data) {
  return request({
    url: `/api/WorkFlow/FlowMonitor`,
    method: 'get',
    data
  })
}
// 批量删除流程监控
export function DeleteList(data) {
  return request({
    url: `/api/WorkFlow/FlowMonitor`,
    method: 'DELETE',
    data
  })
}