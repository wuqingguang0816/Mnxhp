import request from '@/utils/request'

// 添加项目
export function Create(data) {
  return request({
    url: `/api/Extend/ProjectGantt`,
    method: 'post',
    data
  })
}
// 修改项目
export function Update(data) {
  return request({
    url: `/api/Extend/ProjectGantt/${data.id}`,
    method: 'PUT',
    data
  })
}
// 获取项目管理列表
export function ProjectGanttList(data) {
  return request({
    url: `/api/Extend/ProjectGantt`,
    method: 'get',
    data
  })
}
// 删除项目/任务
export function Delete(id) {
  return request({
    url: `/api/Extend/ProjectGantt/${id}`,
    method: 'DELETE'
  })
}
// 获取项目信息
export function ProjectGanttInfo(id) {
  return request({
    url: `/api/Extend/ProjectGantt/${id}`,
    method: 'get'
  })
}
// 获取项目任务列表
export function TaskList(data, projectId) {
  return request({
    url: `/api/Extend/ProjectGantt/${projectId}/Task`,
    method: 'get',
    data
  })
}
// 获取项目任务树形（新建任务）
export function TaskTreeView(projectId) {
  return request({
    url: `/api/Extend/ProjectGantt/${projectId}/Task/Selector`,
    method: 'get'
  })
}
// 获取项目任务信息
export function TaskInfo(taskId) {
  return request({
    url: `/api/Extend/ProjectGantt/Task/${taskId}`,
    method: 'get'
  })
}
// 添加项目任务
export function TaskCreate(data) {
  return request({
    url: `/api/Extend/ProjectGantt/Task`,
    method: 'post',
    data
  })
}
// 修改项目任务
export function TaskUpdate(data) {
  return request({
    url: `/api/Extend/ProjectGantt/Task/${data.id}`,
    method: 'PUT',
    data
  })
}