import request from '@/utils/request'

// 新建订单
export function Create(data) {
  return request({
    url: `api/Extend/Order`,
    method: 'post',
    data
  })
}
// 修改订单
export function Update(data, id) {
  return request({
    url: `/api/Extend/Order/${id}`,
    method: 'PUT',
    data
  })
}
// 获取客户列表
export function CustomerList(keyword) {
  return request({
    url: `/api/Extend/Order/Customer`,
    method: 'get',
    data: { keyword }
  })
}
// 获取商品列表
export function GoodsList(data) {
  return request({
    url: `/api/Extend/Order/Goods`,
    method: 'get',
    data
  })
}
// 导出订单
export function ExportExcel(id) {
  return request({
    url: `/api/Extend/Order/${id}/Export`,
    method: 'get'
  })
}
// 删除订单
export function Delete(id) {
  return request({
    url: `/api/Extend/Order/${id}`,
    method: 'DELETE'
  })
}
// 撤销订单审核
export function FlowRevoke(id, data) {
  return request({
    url: `/api/Extend/Order/${id}/Actions/CancelReview`,
    method: 'post',
    data
  })
}
// 提交审核
export function FlowSubmit(id, freeApproverUserId) {
  return request({
    url: `/api/Extend/Order/${id}/Actons/Review/${freeApproverUserId}`,
    method: 'post'
  })
}
// 获取/查看订单信息
export function OrderInfo(id) {
  return request({
    url: `/api/Extend/Order/${id}`,
    method: 'get'
  })
}
// 获取订单列表
export function OrderList(data) {
  return request({
    url: `/api/Extend/Order`,
    method: 'get',
    data
  })
}
// 获取订单信息(下一个订单)
export function NextInfo(id) {
  return request({
    url: `/api/Extend/Order/${id}/Actions/Next`,
    method: 'get',
  })
}
// 获取订单信息(上一个订单)
export function PrevInfo(id) {
  return request({
    url: `/api/Extend/Order/${id}/Actions/Prev`,
    method: 'get',
  })
}
// 获取订单列表-订单商品
export function OrderEntryList(id) {
  return request({
    url: `/api/Extend/Order/OrderEntry/${id}/Items`,
    method: 'get'
  })
}
// 获取订单列表-收款计划
export function OrderReceivableList(id) {
  return request({
    url: `/api/Extend/Order/${id}/CollectionPlan`,
    method: 'get'
  })
}