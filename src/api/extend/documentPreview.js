import request from '@/utils/request'

// 获取文档列表
export function DocumentPreviewList(data) {
  return request({
    url: `/api/Extend/DocumentPreview`,
    method: 'get',
    data
  })
}
// 文件在线预览
export function PreviewFile(fileId) {
  return request({
    url: `/api/Extend/DocumentPreview/${fileId}/Preview`,
    method: 'get'
  })
}