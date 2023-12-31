module.exports = {
  title: 'JNPF快速开发平台',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  sysConfig: {
    sysVersion: '3.4.7',
    copyright: 'Copyright @ 2023 引迈信息技术有限公司版权所有',
    navigationIcon: '',
    logoIcon: '',
    loginIcon: '',
    sysName: 'JNPF快速开发平台'
  },
  themeClass: 'blue',
  layoutType: 'classic',
  slideClass: 'dark',
  tagsIcon: false,
  showLanguage: true,
  showSearch: true,
  useCache: false,
  errorLog: 'production'
}