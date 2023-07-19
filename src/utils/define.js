const { APIURl } = require('./apiUrl')

module.exports = {
  APIURl,
  timeout: process.env.NODE_ENV === 'development' ? 1000000 : 1000000,
  comUploadUrl: process.env.VUE_APP_BASE_API + '/api/file/Uploader',
  comUrl: process.env.VUE_APP_BASE_API,
  // 本地文件预览
  filePreviewServer: process.env.NODE_ENV === 'development' ? 'http://localhost:30090' : process.env.VUE_APP_BASE_API + '/FileServer',
  // 大屏应用前端路径
  dataV: process.env.NODE_ENV === 'development' ? 'http://localhost:8100/DataV' : window.location.origin + '/DataV',
  // 数据报表接口-java boot
  // reportServer: process.env.NODE_ENV === 'development' ? 'http://localhost:30007' : process.env.VUE_APP_BASE_API + '/ReportServer',
  // 数据报表接口-java cloud
  reportServer: process.env.NODE_ENV === 'development' ? 'http://192.168.0.242:30000' : process.env.VUE_APP_BASE_API,
  // 报表前端
  report: process.env.NODE_ENV === 'development' ? 'http://localhost:8200' : process.env.VUE_APP_BASE_API + '/Report'
}