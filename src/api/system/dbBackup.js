import request from '@/utils/request'

// 获取数据备份列表(带分页)
export function getDbBackupList(data) {
  return request({
    url: '/api/system/Base/DbBackup',
    method: 'GET',
    data
  })
}

// 添加数据备份
export function createDbBackup() {
  return request({
    url: '/api/system/Base/DbBackup',
    method: 'POST'
  })
}

// 删除数据备份
export function delDbBackup(id) {
  return request({
    url: `/api/system/Base/DbBackup/${id}`,
    method: 'DELETE'
  })
}

