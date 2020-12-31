const APIURl = 'http://192.168.0.10:7772'

module.exports = {
  APIURl: APIURl,
  timeout: process.env.NODE_ENV === 'development' ? 2000 : 10000,
  WebSocketUrl: process.env.NODE_ENV === 'development' ? APIURl.replace('http', 'ws') + '/websocket' : process.env.VUE_APP_BASE_WSS,
  comUploadUrl: process.env.VUE_APP_BASE_API + '/api/Common/Uploader',
  comUrl: process.env.VUE_APP_BASE_API,
  // 大屏应用前端路径
  dataV: process.env.NODE_ENV === 'development' ? 'http://localhost:8100/DataV' : process.env.VUE_APP_BASE_API + '/DataV',
  // 数据报表
  reportServer: process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : process.env.VUE_APP_BASE_API + '/ReportServer',
  report: process.env.NODE_ENV === 'development' ? 'http://localhost:8200' : process.env.VUE_APP_BASE_API + '/Report'
}
