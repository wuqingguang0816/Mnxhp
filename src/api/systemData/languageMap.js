import request from '@/utils/request'

// 获取翻译列表(带分页)
export function LanguageMapList(typeId, data) {
  return request({
    url: `/api/system/System/Language/List/${typeId}`,
    method: 'get',
    data
  })
}
//  添加翻译
export function LanguageMapCreate(data) {
  return request({
    url: '/api/system/System/Language',
    method: 'post',
    data
  })
}
// 删除翻译
export function LanguageMapDelete(encode) {
  return request({
    url: `/api/system/System/Language/${encode}`,
    method: 'DELETE',
  })
}
// 获取翻译
export function LanguageMapInfo(encode) {
  return request({
    url: `/api/system/System/Language/${encode}`,
    method: 'get',
  })
}
// 修改翻译
export function LanguageMapUpdate(data, encode) {
  return request({
    url: `/api/system/System/Language/${encode}`,
    method: 'PUT',
    data
  })
}