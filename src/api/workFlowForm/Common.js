import request from '@/utils/request'

export function Info(key, id) {
  return request({
    url: `/api/WorkFlowForm/${key}/${id}`,
    method: 'get'
  })
}
export function Create(key, data) {
  return request({
    url: `/api/WorkFlowForm/${key}`,
    method: 'post',
    data
  })
}
export function Update(key, data) {
  return request({
    url: `/api/WorkFlowForm/${key}/${data.id}`,
    method: 'put',
    data
  })
}