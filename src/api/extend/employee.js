import request from '@/utils/request'

// 获取职员列表(分页)
export function EmployeeList(data) {
  return request({
    url: '/api/Extend/Employee',
    method: 'get',
    data
  })
}
// 删除职员信息
export function EmployeeDelete(id) {
  return request({
    url: `/api/Extend/Employee/${id}`,
    method: 'DELETE'
  })
}
// 导出Excel
export function ExportExcel() {
  return request({
    url: 'api/Extend/Employee/ExportExcel',
    method: 'get'
  })
}
// 导出pdf
export function ExportPdf() {
  return request({
    url: '/api/Extend/Employee/ExportPdf',
    method: 'get'
  })
}
// 导出Word
export function ExportWord() {
  return request({
    url: '/api/Extend/Employee/ExportWord',
    method: 'get'
  })
}
// 导入
export function ImportData() {
  return request({
    url: '/api/Extend/Employee/ImportData',
    method: 'post'
  })
}
// 模板下载
export function TemplateDownload() {
  return request({
    url: '/api/Extend/Employee/TemplateDownload',
    method: 'get'
  })
}