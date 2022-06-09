import request from '@/utils/request'

export function getVisualTables(id) {
  return request({
    url: `/api/system/ModuleDataAuthorizeLink/getVisualTables/${id}`,
    method: 'get',
  })
}

export function getTableInfoByTableName(linkId, tableName, data) {
  return request({
    url: `/api/system/ModuleDataAuthorizeLink/${linkId}/Tables/${tableName}/Fields`,
    method: 'post',
    data
  })
}
