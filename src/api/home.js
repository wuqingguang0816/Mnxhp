import request from '@/utils/request'

// 获取我的待办
export function getFlowTodoCount() {
  return request({
    url: '/api/Home/FlowTodoCount',
    method: 'get'
  })
}
// 获取通知公告
export function getNotice() {
  return request({
    url: '/api/Home/Notice',
    method: 'get'
  })
}
// 获取未读邮件
export function getEmail() {
  return request({
    url: '/api/Home/Email',
    method: 'get'
  })
}
// 获取待办事项
export function getFlowTodo() {
  return request({
    url: '/api/Home/FlowTodo',
    method: 'get'
  })
}
// 获取我的待办事项
export function getMyFlowTodo() {
  return request({
    url: '/api/Home/MyFlowTodo',
    method: 'get'
  })
}