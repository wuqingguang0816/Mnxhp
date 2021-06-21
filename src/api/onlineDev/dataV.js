import request from '@/utils/request'

// 获取大屏下拉框
export const getDataVSelector = () => {
  return request({
    url: '/blade-visual/visual/Selector',
    method: 'GET'
  })
}