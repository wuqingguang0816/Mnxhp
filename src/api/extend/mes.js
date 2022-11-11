import request from '@/utils/request'

// 创建
export function createMes(data) {
  return request({
    url: `/api/example/MesWorkGeneral`,
    method: 'POST',
    data
  })
}
// 信息
export function detail(id) {
  return request({
    url: `/api/example/MesWorkGeneral/${id}`,
    method: 'get',
  })
}
// 更新
export function editMes(data) {
  return request({
    url: `/api/example/MesWorkGeneral/${data.id}`,
    method: 'put',
    data
  })
}
// 删除
export function delMes(id) {
  return request({
    url: `/api/example/MesWorkGeneral/${id}`,
    method: 'DELETE',
  })
}
// 详情页
export function getDetail(id) {
  return request({
    url: `/api/example/MesWorkGeneral/detail/${id}`,
    method: 'get'
  })
}
// 获取列表
export function getList(data) {
  return request({
    url: `/api/example/MesWorkGeneral/getList`,
    method: 'post',
    data
  })
}

// 生产用料信息
export function getMateria(materialNo) {
  return request({
    url: `/api/example/MesWorkGeneral/materialNo/${materialNo}`,
    method: 'get',
  })
}
// 获取列表
export function getMesList(id, data) {
  return request({
    url: `/api/visualdev/OnlineDev/${id}/List`,
    method: 'post',
    data
  })
}
// 获取列表
export function getDictionaryData(id, data) {
  return request({
    url: `/api/system/DictionaryData/${id}`,
    method: 'get',
    data
  })
}



