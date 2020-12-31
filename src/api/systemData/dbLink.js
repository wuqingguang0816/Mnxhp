import request from '@/utils/request'

export function getDbLinkList(data) {
  return request({
    url: '/api/PlatForm/DbLink',
    method: 'get',
    data
  })
}
export function DbLinkCreate(data) {
  return request({
    url: '/api/PlatForm/DbLink',
    method: 'post',
    data
  })
}
export function DbLinkDelete(id) {
  return request({
    url: `/api/PlatForm/DbLink/${id}`,
    method: 'delete',
  })
}
export function DbLinkInfo(id) {
  return request({
    url: `/api/PlatForm/DbLink/${id}`,
    method: 'get',
  })
}
export function DbLinkUpdate(data) {
  return request({
    url: `/api/PlatForm/DbLink/${data.id}`,
    method: 'put',
    data
  })
}
export function TestDbConnection(data) {
  return request({
    url: `/api/PlatForm/DbLink/Actions/Test`,
    method: 'post',
    data
  })
}
export function getDbLinkListAll() {
  return request({
    url: '/api/PlatForm/DbLink/Selector',
    method: 'get',
  })
}
export function Execute(data) {
  return request({
    url: `/api/PlatForm/DbSync/Actions/Execute`,
    method: 'post',
    data
  })
}
// 新接口文档未有 
export function IsExistByFullName(data) {
  return request({
    url: '/api/PlatForm/DbLink/IsExistByFullName',
    method: 'get',
    data
  })
}
