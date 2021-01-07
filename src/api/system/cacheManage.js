import request from '@/utils/request'

export function CacheManageClear(name) {
  return request({
    url: `/api/system/System/CacheManage/${name}`,
    method: 'delete',
  })
}
export function CacheManageClearAll() {
  return request({
    url: '/api/system/System/CacheManage/Actions/ClearAll',
    method: 'post',
  })
}
export function CacheManageInfo(name) {
  return request({
    url: `/api/system/System/CacheManage/${name}`,
    method: 'get',
  })
}
export function CacheManageList(data) {
  return request({
    url: '/api/system/System/CacheManage',
    method: 'get',
    data
  })
}
