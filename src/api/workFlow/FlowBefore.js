import request from '@/utils/request'

// 获取待我审核
export function FlowBeforeList(category, data) {
  return request({
    url: `/api/WorkFlow/FlowBefore/List/${category}`,
    method: 'get',
    data
  })
}
// 获取待我审批信息
export function FlowBeforeInfo(id) {
  return request({
    url: `/api/WorkFlow/FlowBefore/${id}`,
    method: 'get'
  })
}
// 待我审核审核
export function Audit(id, data) {
  return request({
    url: `/api/WorkFlow/FlowBefore/Audit/${id}`,
    method: 'post',
    data
  })
}
// 待我审核驳回
export function Reject(id, data) {
  return request({
    url: `/api/WorkFlow/FlowBefore/Reject/${id}`,
    method: 'post',
    data
  })
}
// 待我审核撤回审核
export function Recall(id, data) {
  return request({
    url: `/api/WorkFlow/FlowBefore/Recall/${id}`,
    method: 'post',
    data
  })
}
// 待我审核终止审核
export function Cancel(id, data) {
  return request({
    url: `/api/WorkFlow/FlowBefore/Cancel/${id}`,
    method: 'post',
    data
  })
}