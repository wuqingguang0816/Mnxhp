import request from '@/utils/request'

// 获取动态表单信息
export function Info(id) {
  return request({
    url: `/api//workflow/Engine/FlowTask/${id}`,
    method: 'get'
  })
}
// 新建动态表单
export function Create(data) {
  return request({
    url: `/api//workflow/Engine/FlowTask`,
    method: 'post',
    data
  })
}
// 修改动态表单
export function Update(data) {
  return request({
    url: `/api//workflow/Engine/FlowTask/${data.id}`,
    method: 'put',
    data
  })
}
