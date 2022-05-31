import request from '@/utils/request'

// 获取分级管理员列表
export const getGradeManageList = (data) => {
  return request({
    url: `/api/permission/organizeAdminIsTrator`,
    method: 'GET',
    data
  })
}


//获取组织下拉框列表
export const getSelectorOrgList = (organizeId, userId) => {
  return request({
    url: `/api/permission/organizeAdminIsTrator/Selector/${organizeId}` + '?userId=' + userId,
    method: 'GET'
  })
}