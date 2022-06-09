import request from '@/utils/request'

// 获取接口认证列表(分页)
export function getInterfaceIdentificationList(data) {
  return request({
    url: '/api/system/InterfaceIdentification',
    method: 'GET',
    data
  })
}

// 创建
export function create(data) {
  return request({
    url: '/api/system/InterfaceIdentification',
    method: 'POST',
    data
  })
}

// 修改接口
export function update(data) {
  return request({
    url: `/api/system/InterfaceIdentification/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除接口认证数据
export function deleteInterfaceIdent(id) {
  return request({
    url: `/api/system/InterfaceIdentification/${id}`,
    method: 'DELETE'
  })
}

// 获取秘钥
export function getAppSecret() {
  return request({
    url: `/api/system/InterfaceIdentification/getAppSecret`,
    method: 'GET'
  })
}


// 保存认证接口列表
export function saveInterfaceList(data) {
  return request({
    url: `/api/system/InterfaceIdentification/saveInterfaceList`,
    method: 'POST',
    data
  })
}
// 获取认证接口列表
export function getInterfaceList(id) {
  return request({
    url: `/api/system/InterfaceIdentification/getInterfaceList/${id}`,
    method: 'GET',
  })
}