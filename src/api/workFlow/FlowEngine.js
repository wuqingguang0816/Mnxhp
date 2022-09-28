import request from '@/utils/request'

// 获取流程引擎列表
export function FlowEngineList(data) {
  return request({
    url: `/api/workflow/Engine/flowTemplate`,
    method: 'get',
    data
  })
}
// 获取流程引擎信息
export function FlowEngineInfo(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${id}`,
    method: 'get'
  })
}
// 删除流程引擎
export function Delete(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${id}`,
    method: 'DELETE'
  })
}
// 新建流程引擎
export function Create(data) {
  return request({
    url: `/api/workflow/Engine/flowTemplate`,
    method: 'post',
    data
  })
}
//  更新流程引擎
export function Update(data) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${data.id}`,
    method: 'PUT',
    data
  })
}
// 复制流程
export function Copy(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${id}/Actions/Copy`,
    method: 'post'
  })
}
// 导出流程
export function exportData(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${id}/Actions/ExportData`,
    method: 'GET'
  })
}
// 发布流程引擎
export function Release(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/Release/${id}`,
    method: 'post'
  })
}
// 停止流程引擎
export function Stop(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/Stop/${id}`,
    method: 'post'
  })
}
// 列表ListAll
export function FlowEngineListAll() {
  return request({
    url: `/api/workflow/Engine/flowTemplate/ListAll`,
    method: 'get'
  })
}
// 列表ListAll
export function FlowEnginePageList(data) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/PageListAll`,
    method: 'get',
    data
  })
}
// 流程引擎下拉框
export function FlowEngineSelector(type) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/Selector`,
    method: 'get',
    data: { type }
  })
}
// 流程表单主表属性
export function getFormDataFields(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${id}/FormDataFields`,
    method: 'get'
  })
}
// 流程表单数据
export function FieldDataSelect(id) {
  return request({
    url: `/api/workflow/Engine/flowTemplate/${id}/FieldDataSelect`,
    method: 'get'
  })
}
// 获取流程表单详情
export function getFlowTaskData(flowId, id) {
  return request({
    url: `/api/workflow/Engine/FlowTask/${flowId}/${id}`,
    method: 'get'
  })
}
// 获取流程评论列表
export function getCommentList(data) {
  return request({
    url: `/api/workflow/Engine/FlowComment`,
    method: 'get',
    data
  })
}
// 新建流程评论
export function createComment(data) {
  return request({
    url: `/api/workflow/Engine/FlowComment`,
    method: 'post',
    data
  })
}
// 删除流程评论
export function delComment(id) {
  return request({
    url: `/api/workflow/Engine/FlowComment/${id}`,
    method: 'delete'
  })
}