import request from '@/utils/request'

// 获取流程发起列表
export function FlowLaunchList(data) {
  return request({
    url: `/api/workflow/Engine/FlowLaunch`,
    method: 'get',
    data
  })
}
// 删除流程发起
export function Delete(id) {
  return request({
    url: `/api/workflow/Engine/FlowLaunch/${id}`,
    method: 'DELETE'
  })
}
// 撤回流程发起
export function Revoke(id, data) {
  return request({
    url: `/api/workflow/Engine/FlowLaunch/${id}/Actions/Withdraw`,
    method: 'PUT',
    data
  })
}
