import request from '@/utils/request'

export function Info(key, id) {
  key = key.replace(key[0], key[0].toUpperCase())
  return request({
    url: `/api/workflow/Form/${key}/${id}`,
    method: 'get'
  })
}
export function Create(key, data) {
  key = key.replace(key[0], key[0].toUpperCase())
  return request({
    url: `/api/workflow/Form/${key}`,
    method: 'post',
    data
  })
}
export function Update(key, data) {
  key = key.replace(key[0], key[0].toUpperCase())
  return request({
    url: `/api/workflow/Form/${key}/${data.id}`,
    method: 'put',
    data
  })
}
