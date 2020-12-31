import request from '@/utils/request'

// 获取大屏列表(分页)
export const getDataVList = (data) => {
  return request({
    url: '/api/DataV/Data',
    method: 'GET',
    data
  })
}

// 获取大屏下拉框
export const getDataVSelector = () => {
  return request({
    url: '/api/DataV/Data/Selector',
    method: 'GET'
  })
}

// 删除大屏
export const delDataV = (id) => {
  return request({
    url: `/api/DataV/Data/${id}`,
    method: 'DELETE'
  })
}

// 复制大屏
export const copyDataV = (id) => {
  return request({
    url: `/api/DataV/Data/${id}/Actions/Copy`,
    method: 'POST'
  })
}

// 更新大屏状态
export const updateDataVState = (id) => {
  return request({
    url: `/api/DataV/Data/${id}/Actions/State`,
    method: 'PUT'
  })
}
