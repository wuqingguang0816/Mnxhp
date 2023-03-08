import request from '@/utils/request'
// 获取外链信息
export function getShortLink(id) {
  return request({
    url: `/api/visualdev/ShortLink/${id}`,
    method: 'get'
  })
}
//保存外链信息
export function save(data) {
  return request({
    url: `/api/visualdev/ShortLink`,
    method: 'PUT',
    data
  })
}

// 获取外链信息
export function getConfig(id, tenantId) {
  return request({
    url: `/api/visualdev/ShortLink/getConfig/${id}` + (tenantId ? '?tenantId=' + tenantId : ''),
    method: 'get'
  })
}

// 获取外链信息
export function checkPwd(data) {
  return request({
    url: `/api/visualdev/ShortLink/checkPwd`,
    method: 'post',
    data
  })
}
// 获取列表表单配置JSON
export function getConfigData(modelId, data, tenantId) {
  return request({
    url: `/api/visualdev/ShortLink/${modelId}/Config` + (tenantId ? '?tenantId=' + tenantId : ''),
    method: 'get',
    data
  })
}
// 添加数据
export function createModel(modelId, data, tenantId) {
  return request({
    url: `/api/visualdev/ShortLink/${modelId}` + (tenantId ? '?tenantId=' + tenantId : ''),
    method: 'POST',
    data
  })
}


// 获取数据详情
export function getDataChange(modelId, id, tenantId) {
  return request({
    url: `/api/visualdev/ShortLink/${modelId}/${id}/DataChange` + (tenantId ? '?tenantId=' + tenantId : ''),
    method: 'GET'
  })
}


// 获取数据列表
export function getModelListLink(modelId, data, tenantId) {
  return request({
    url: `/api/visualdev/ShortLink/${modelId}/ListLink` + (tenantId ? '?tenantId=' + tenantId : ''),
    method: 'post',
    data
  })
}