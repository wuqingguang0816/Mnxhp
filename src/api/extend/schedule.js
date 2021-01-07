import request from '@/utils/request'

// 获取日程安排列表
export function List(data) {
  return request({
    url: '/api/Extend/Schedule',
    method: 'get',
    data
  })
}
// 新建日程安排
export function ScheduleCreate(data) {
  return request({
    url: '/api/Extend/Schedule',
    method: 'post',
    data
  })
}
// 删除日程安排
export function ScheduleDelete(id) {
  return request({
    url: `/api/Extend/Schedule/${id}`,
    method: 'DELETE',
  })
}
// 获取日程安排信息
export function ScheduleInfo(id) {
  return request({
    url: `/api/Extend/Schedule/${id}`,
    method: 'get'
  })
}
// 更新日程安排
export function ScheduleUpdate(data) {
  return request({
    url: `/api/Extend/Schedule/${data.id}`,
    method: 'PUT',
    data
  })
}
// app用
export function AppDayList() {
  return request({
    url: '/api/Extend/Schedule/AppDayList',
    method: 'get',
  })
}
export function AppList() {
  return request({
    url: '/api/Extend/Schedule/AppList',
    method: 'get',
  })
}