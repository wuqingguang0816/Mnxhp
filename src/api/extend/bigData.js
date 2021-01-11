import request from '@/utils/request'

// 获取数据列表（分页）
export function BigDataList(data) {
  return request({
    url: '/api/Extend/BigData',
    method: 'get',
    data
  })
}
export function BigDataCreate() {
  return request({
    url: '/api/Extend/BigData',
    method: 'post',
  })
}