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
    url: `/api/workflow/Form/save`,
    method: 'post',
    data
  })
}

//修改表单
export function Update(data) {
  return request({
    url: `/api/workflow/Form/update`,
    method: 'put',
    data
  })
}

//发布/回滚
export function release(id, isRelease) {
  return request({
    url: `/api/workflow/Form/release/${id}` + '?isRelease=' + isRelease,
    method: 'post',
  })
}

//复制表单
export function copyForm(id) {
  return request({
    url: `/api/workflow/Form/copy/${id}`,
    method: 'get',
  })
}

//删除表单
export function del(id) {
  return request({
    url: `/api/workflow/Form/delete/${id}`,
    method: 'delete',
  })
}



