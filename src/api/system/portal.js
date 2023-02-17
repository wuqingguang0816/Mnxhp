import request from '@/utils/request'

// 获取列表
export function getPortalManageList(systemId, data) {
  return request({
    url: `/api/system/portalManage/${systemId}`,
    method: 'GET',
    data
  })
}

// 获取门户名称列表
export function getPortalManageSelector() {
  return request({
    url: `/api/visualdev/Portal/Selector`,
    method: 'GET'
  })
}

// 详情
export function getPortalManageInfo(id) {
  return request({
    url: `/api/system/portalManage/${id}`,
    method: 'GET',
  })
}
// 新建
export function createPortal(data) {
  return request({
    url: `/api/system/portalManage`,
    method: 'post',
    data
  })
}

// 编辑
export function updatePortal(data) {
  return request({
    url: `/api/system/portalManage/${data.id}`,
    method: 'put',
    data
  })
}