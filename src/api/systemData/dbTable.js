import request from '@/utils/request'

// 获取数据库表列表
export function DbTableList(id, data) {
  return request({
    url: `/api/PlatForm/Database/${id}/Tables`,
    method: 'get',
    data
  })
}
// 添加数据表
export function DbTableCreate(linkId, data) {
  return request({
    url: `/api/PlatForm/Database/${linkId}/Table`,
    method: 'post',
    data
  })
}
// 预览数据库表
export function DbTableData(linkId, table, data) {
  return request({
    url: `/api/PlatForm/Database/${linkId}/Table/${table}/Preview`,
    method: 'get',
    data
  })
}
// 删除数据表
export function DbTableDelete(linkId, id) {
  return request({
    url: `/api/PlatForm/Database/${linkId}/Table/${id}`,
    method: 'delete',
  })
}
// 获取数据库表字段列表
export function DbTableFieldList(linkId, table) {
  return request({
    url: `/api/PlatForm/Database/${linkId}/Tables/${table}/Fields`,
    method: 'get',
  })
}
//  获取数据表
export function DbTableInfo(linkId, id) {
  return request({
    url: `/api/PlatForm/Database/${linkId}/Table/${id}`,
    method: 'get',
  })
}
// 修改数据表
export function DbTableUpdate(linkId, data) {
  return request({
    url: `/api/PlatForm/Database/${linkId}/Table`,
    method: 'put',
    data
  })
}
// 新接口文档未有
export function IsExistByTable(data) {
  return request({
    url: '/api/PlatForm/DbTable/IsExistByTable',
    method: 'get',
    data
  })
}