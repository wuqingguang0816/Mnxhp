import request from '@/utils/request'

// 获取方案列表
export function getAdvancedQueryList(moduleId) {
  return request({
    url: `/api/system/AdvancedQuery/${moduleId}/List`,
    method: 'get'
  })
}
// 获取方案详情
export function getAdvancedQueryInfo(id) {
  return request({
    url: `/api/system/AdvancedQuery/${id}`,
    method: 'get'
  })
}
// 删除
export function Delete(id) {
  return request({
    url: `/api/system/AdvancedQuery/${id}`,
    method: 'DELETE'
  })
}

// 新建
export function Create(data) {
  return request({
    url: '/api/system/AdvancedQuery',
    method: 'post',
    data
  })
}

