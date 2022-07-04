import request from '@/utils/request'

//表单列表
export function getFormList(data) {
  return request({
    url: `/api/workflow/Form`,
    method: 'get',
    data
  })
}
//查看
export function getFormInfo(id) {
  return request({
    url: `/api/workflow/Form/${id}`,
    method: 'get'
  })
}
//暂存表单
export function SaveAudit(data) {
  return request({
    url: `/api/workflow/Form`,
    method: 'post',
    data
  })
}

//修改表单
export function Update(data) {
  return request({
    url: `/api/workflow/Form`,
    method: 'put',
    data
  })
}

//发布/回滚
export function release(id, isRelease) {
  return request({
    url: `/api/workflow/Form/Release/${id}` + '?isRelease=' + isRelease,
    method: 'post',
  })
}

//复制表单
export function copyForm(id) {
  return request({
    url: `/api/workflow/Form/${id}/Actions/Copy`,
    method: 'get',
  })
}

//删除表单
export function del(id) {
  return request({
    url: `/api/workflow/Form/${id}`,
    method: 'delete',
  })
}

//导出
export function exportData(id) {
  return request({
    url: `/api/workflow/Form/${id}/Actions/ExportData`,
    method: 'get',
  })
}



