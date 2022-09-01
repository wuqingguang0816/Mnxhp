import request from '@/utils/request'
// 列表
export const getConfigList = data => {
  return request({
    url: '/api/message/AccountConfig',
    method: 'GET',
    data
  })
}
// 新增
export const createConfig = data => {
  return request({
    url: '/api/message/AccountConfig',
    method: 'POST',
    data
  })
}
//数据类型具体对应数据：1：消息类型，2：渠道，3：webhook类型，4：消息来源
export const getMsgTypeList = type => {
  return request({
    url: `/api/message/MessageDataType/getTypeList/${type}`,
    method: 'post'
  })
}
// 详情
export const getConfigDetail = id => {
  return request({
    url: `/api/message/AccountConfig/${id}`,
    method: 'GET'
  })
}
// 编辑
export const updateConfig = data => {
  return request({
    url: `/api/message/AccountConfig/${data.id}`,
    method: 'PUT',
    data
  })
}
// 测试
export const testConfig = (data,type) => {
  return request({
    url: `/api/message/AccountConfig/${type}`,
    method: 'POST',
    data
  })
}
// 复制
export const copyConfig = id => {
  return request({
    url: `/api/message/AccountConfig/copy/${id}`,
    method: 'post'
  })
}
// 刪除
export const delConfig = id => {
  return request({
    url: `/api/message/AccountConfig/${id}`,
    method: 'DELETE'
  })
}
// 导出
export const exportConfig = id => {
  return request({
    url: `/api/message/AccountConfig/${id}/Action/Export`,
    method: 'GET'
  })
}