import request from '@/utils/request'

// 获取地图列表(带分页)
export const getMapList = (data) => {
  return request({
    url: '/api/system/DataV/Map',
    method: 'GET',
    data
  })
}

// 新建地图
export const createMap = (data) => {
  return request({
    url: '/api/system/DataV/Map',
    method: 'POST',
    data
  })
}

// 修改地图
export const updateMap = (data) => {
  return request({
    url: `/api/system/DataV/Map/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取地图信息
export const getMapInfo = (id) => {
  return request({
    url: `/api/system/DataV/Map/${id}`,
    method: 'GET'
  })
}

// 删除地图
export const delMap = (id) => {
  return request({
    url: `/api/system/DataV/Map/${id}`,
    method: 'DELETE'
  })
}

// 更新地图状态
export const updateMapState = (id) => {
  return request({
    url: `/api/system/DataV/Map/${id}/Actions/State`,
    method: 'PUT'
  })
}

