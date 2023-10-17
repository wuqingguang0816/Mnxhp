import request from '@/utils/request'
// 获取事业部
//调用API数据接口	SQL操作
export function PostApiActionSQL(linkId, data = {
  origin: "preview",
  paramList: [],
  tenantId: ""
}) {
  return request({
    url: `/api/system/DataInterface/${linkId}/Actions/Preview`,
    method: 'POST',
    data
  })
}
