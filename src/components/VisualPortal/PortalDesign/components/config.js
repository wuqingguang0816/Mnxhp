const dataBoardDefault = [
  {
    fullName: "新增客户",
    unit: "个",
    num: 262,
    dataType: 'static',
    propsApi: '',
    icon: "icon-ym icon-ym-wf-contractApproval",
    iconColor: "rgb(123, 26, 225)",
    moduleId: "",
    linkType: '',
    urlAddress: '',
    linkTarget: '_self',
  },
  {
    fullName: "新增商机",
    unit: "个",
    num: 199,
    dataType: 'static',
    propsApi: '',
    icon: "icon-ym icon-ym-wf-outgoingApply",
    iconColor: "rgb(74, 184, 255)",
    moduleId: "",
    linkType: '',
    urlAddress: '',
    linkTarget: '_self',
  },
  {
    fullName: "合同金额",
    unit: "元",
    num: 126263.5,
    dataType: 'static',
    propsApi: '',
    icon: "icon-ym icon-ym-wf-payDistribution",
    iconColor: "rgb(255, 139, 88)",
    moduleId: "",
    linkType: '',
    urlAddress: '',
    linkTarget: '_self',
  },
  {
    fullName: "回款金额",
    unit: "元",
    num: 6223.2,
    dataType: 'static',
    propsApi: '',
    icon: "icon-ym icon-ym-wf-incomeRecognition",
    iconColor: "rgb(252, 91, 135)",
    moduleId: "",
    linkType: '',
    urlAddress: '',
    linkTarget: '_self',
  }
]
export const layoutComponents = [
  {
    icon: 'icon-ym icon-ym-generator-todo',
    label: '卡片面板',
    jnpfKey: 'card',
    title: '卡片面板',
    card: {
      titleFontSize: 14,
      titleFontWeight: false,
      titleFontColor: '#303133',
      titleLeft: 'left',
      titleBgColor: '',
      cardIcon: 'icon-ym icon-ym-generator-todo',
      cardIconColor: "#666",
      linkType: '',
      type: '',
      moduleId: '',
      urlAddress: '',
      linkTarget: '_self',
      appLinkType: '',
      appType: '',
      appModuleId: '',
      appUrlAddress: '',
      appLinkTarget: '_self',
    },
    children: [],
    w: 6,
    h: 6,
    minW: 6,
    minH: 4,
    maxW: 12,
    maxH: 12
  }, {
    icon: 'icon-ym icon-ym-generator-todo',
    label: '标签面板',
    jnpfKey: 'tab',
    title: '标签面板',
    card: {
      titleFontSize: 14,
      titleFontWeight: false,
      titleFontColor: '#303133',
      titleLeft: 'left',
      titleBgColor: '',
      cardIcon: 'icon-ym icon-ym-generator-todo',
      cardIconColor: "#666",
      linkType: '',
      type: '',
      moduleId: '',
      urlAddress: '',
      linkTarget: '_self',
      appLinkType: '',
      appType: '',
      appModuleId: '',
      appUrlAddress: '',
      appLinkTarget: '_self',
    },
    children: [
      {
        title: "Tab 1",
        children: []
      },
      {
        title: "Tab 2",
        children: []
      }
    ],
    active: 0,
    type: "",
    "tab-position": "top",
    w: 6,
    h: 6,
    minW: 6,
    minH: 4,
    maxW: 12,
    maxH: 12
  },
  // {
  //   icon: 'icon-ym icon-ym-generator-todo',
  //   label: '折叠面板',
  //   jnpfKey: 'collapse',
  //   title: '折叠面板',
  //   card: {
  //     titleFontSize: 14,
  //     titleFontWeight: false,
  //     titleFontColor: '#303133',
  //     titleLeft: 'left',
  //     titleBgColor: '',
  //     cardIcon: 'icon-ym icon-ym-generator-todo',
  //     cardIconColor: "#666",
  //     linkType: '',
  //     type: '',
  //     urlAddress: '',
  //     linkTarget: '_self',
  //     appLinkType: '',
  //     appType: '',
  //     appUrlAddress: '',
  //     appLinkTarget: '_self',
  //   },
  //   children: [
  //     {
  //       title: "面板1",
  //       name: "1",
  //       children: [],
  //     },
  //     {
  //       title: "面板2",
  //       name: "2",
  //       children: [],
  //     }
  //   ],
  //   active: ["1"],
  //   w: 6,
  //   h: 6,
  //   minW: 6,
  //   minH: 4,
  //   maxW: 12,
  //   maxH: 12
  // }
]
export const systemComponents = [{
  icon: 'icon-ym icon-ym-generator-notice',
  label: '公告通知',
  jnpfKey: 'notice',
  title: '公告通知',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-notice',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  w: 4,
  h: 7,
  minW: 4,
  minH: 7,
  maxW: 12,
  maxH: 7
},
{
  icon: 'icon-ym icon-ym-generator-email',
  label: '未读邮件',
  jnpfKey: 'email',
  title: '未读邮件',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-email',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  w: 4,
  h: 7,
  minW: 4,
  minH: 7,
  maxW: 12,
  maxH: 7
},
{
  icon: 'icon-ym icon-ym-generator-todolist',
  label: '待办事项',
  jnpfKey: 'todoList',
  title: '待办事项',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-todolist',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  w: 4,
  h: 7,
  minW: 4,
  minH: 7,
  maxW: 12,
  maxH: 12
}]
// 基础控件 【左面板】
export const basicComponents = [{
  icon: 'icon-ym icon-ym-generator-todo',
  label: '我的待办',
  jnpfKey: 'todo',
  title: '我的待办',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-todo',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  option: {
    styleType: 1,
    defaultValue: [
      { fullName: "流程待办", id: "1", noShow: false, num: 0, category: '', urlAddress: "/workFlow/flowTodo", icon: "icon-ym icon-ym-flowTodo", iconBgColor: "#f68900", type: 2 },
      { fullName: "流程已办", id: "3", noShow: false, num: 0, category: '', urlAddress: "/workFlow/flowDone", icon: "icon-ym icon-ym-flowDone", iconBgColor: "#7b1ae1", type: 2 },
      { fullName: "流程抄送", id: "4", noShow: false, num: 0, category: '', urlAddress: "/workFlow/flowCirculate", icon: "icon-ym icon-ym-flowForm", iconBgColor: "#33b932", type: 2 },
    ],
    rowNumber: 3,
    showBorder: false,
    appRowNumber: 4,
    appShowBorder: false,
    labelFontSize: 14,
    labelFontWeight: false,
    labelFontColor: '#666',
    valueFontSize: 24,
    valueFontWeight: true,
    valueFontColor: '#303133',
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 4,
  minW: 6,
  minH: 3,
  maxW: 12,
  maxH: 12
},
{
  icon: 'icon-ym icon-ym-generator-function',
  label: '常用功能',
  jnpfKey: 'commonFunc',
  title: '常用功能',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-function',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  option: {
    styleType: 1,
    appStyleType: 1,
    defaultValue: [
      {
        fullName: "功能设计",
        moduleId: "85cd7bca426e49ce83a061bf461b1447",
        linkType: '1',
        linkTarget: '_self',
        urlAddress: "onlineDev/webDesign",
        icon: "icon-ym icon-ym-webDesign",
        iconBgColor: "#FF3B3B",
        type: 2
      },
      {
        fullName: "流程设计",
        moduleId: "fe0150960dd542ec9328067e4495074b",
        linkType: '1',
        linkTarget: '_self',
        urlAddress: "workFlow/flowEngine",
        icon: "icon-ym icon-ym-flowDesign",
        iconBgColor: "#7B1AE1",
        type: 2
      },
      {
        fullName: "权限管理",
        moduleId: "9057d797550e4457b7ddf2456ce45882",
        linkType: '1',
        linkTarget: '_self',
        urlAddress: "permission/authorize",
        icon: "icon-ym icon-ym-authorize",
        iconBgColor: "#1890FF",
        type: 2
      },
      {
        fullName: "报表设计",
        moduleId: "c7159f97177b420d9fc8ec8c74ae541b",
        linkType: '1',
        linkTarget: '_self',
        urlAddress: "onlineDev/dataReport",
        icon: "icon-ym icon-ym-reportDesign",
        iconBgColor: "#F68900",
        type: 2
      },
      {
        fullName: "门户设计",
        moduleId: "232d7226f00446d882e1e1bd999f7b2d",
        linkType: '1',
        linkTarget: '_self',
        urlAddress: "onlineDev/visualPortal",
        icon: "icon-ym icon-ym-portalDesign",
        iconBgColor: "#33B932",
        type: 2
      }
    ],
    appDefaultValue: [
      {
        fullName: "JNPF快速开发",
        moduleId: "",
        linkType: '2',
        urlAddress: 'https://www.jnpfsoft.com/',
        linkTarget: '_blank',
        icon: "icon-ym icon-ym-webDesign",
        iconBgColor: "#33B932",
        type: 2
      },
    ],
    rowNumber: 5,
    showBorder: false,
    appRowNumber: 4,
    appShowBorder: false,
    labelFontSize: 14,
    labelFontWeight: false,
    labelFontColor: '#666',
  },
  w: 6,
  h: 4,
  minW: 6,
  minH: 3,
  maxW: 12,
  maxH: 12
},
{
  icon: 'icon-ym icon-ym-generator-Panel',
  label: '数据面板',
  jnpfKey: 'dataBoard',
  title: '数据面板',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-function',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  option: {
    styleType: 1,
    appStyleType: 1,
    defaultValue: dataBoardDefault,
    appDefaultValue: dataBoardDefault,
    rowNumber: 4,
    showBorder: false,
    appRowNumber: 4,
    appShowBorder: false,
    labelFontSize: 14,
    labelFontWeight: false,
    labelFontColor: '#666',
    valueFontSize: 24,
    valueFontWeight: true,
    valueFontColor: '#303133',
    unitFontSize: 14,
    unitFontWeight: false,
    unitFontColor: '#666',
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 12,
  h: 4,
  minW: 6,
  minH: 3,
  maxW: 12,
  maxH: 12
},
{
  icon: 'icon-ym icon-ym-generator-table',
  label: '表格列表',
  jnpfKey: 'tableList',
  title: '表格列表',
  dataType: 'static',
  propsApi: '',
  border: false,
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-table',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  option: {
    styleType: 1,
    defaultValue: [],
    showHeader: true,
    headerFontSize: 14,
    headerFontWeight: false,
    headerFontColor: '#303133',
    headerLeft: 'left',
    headerBgColor: '#F4F6F8',
    tableIndex: true,
    tableCount: 5,
    tableFontSize: 14,
    tableFontColor: '#666666',
    tableBgColor: '',
    tableOddLineColor: '',
    tableEvenLineColor: '',
    tableBgColor: '',
    describe: false,
    showName: true,
    textFontSize: 14,
    textFontColor: '#303133',
    textFontWeight: false,
    appCount: 5,
    appColumnList: [{
      fullName: '姓名',
      filedName: 'comInputField102',
    },
    {
      fullName: '日期',
      filedName: 'comInputField105',
    }
    ],
    columnData: [{
      fullName: '排名',
      filedName: 'comInputField101',
      sortable: false,
      fixed: "none",
      align: 'left',
      width: 0
    },
    {
      fullName: '姓名',
      filedName: 'comInputField102',
      sortable: false,
      fixed: "none",
      align: 'left',
      width: 0
    },
    {
      fullName: '销售额',
      filedName: 'comInputField103',
      sortable: false,
      fixed: "none",
      align: 'left',
      width: 0
    },
    {
      fullName: '完成情况',
      filedName: 'comInputField104',
      sortable: false,
      fixed: "none",
      align: 'left',
      width: 0
    }],
    rowData: [{
      fullName: '标题',
      filedName: 'comInputField102',
      fontSize: 14,
      fontWeight: false,
      fontColor: '#000'
    }, {
      fullName: '描述',
      filedName: 'comInputField103',
      fontSize: 12,
      fontWeight: false,
      fontColor: '#999'
    }, {
      fullName: '时间',
      filedName: 'comInputField105',
      fontSize: 12,
      fontWeight: false,
      fontColor: '#999'
    }],
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 4,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-textarea',
  label: '文本',
  jnpfKey: 'text',
  title: '文本',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-textarea',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: '',
    textFontSize: 14,
    textFontColor: '#303133',
    textFontWeight: false,
    textFontStyle: false,
    textLeft: 'left',
    textUnderLine: 'none',
    textBgColor: "",
    textAutoplay: false,
    textAutoplayMode: 'left',
    textAutoplaySpeed: 60,
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 4,
  h: 3,
  minW: 4,
  minH: 2,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-Panel',
  label: '图片',
  jnpfKey: 'image',
  title: '图片',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-Panel',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 2,
    defaultValue: "",
    textDefaultValue: "JNPF快速开发平台",
    textFontSize: 14,
    textFontColor: '#fff',
    textFontWeight: false,
    textFontStyle: false,
    textLeft: 'center',
    textBgColor: "#30313399",
    imageFillStyle: 'cover',
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 6,
  minW: 4,
  minH: 4,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-Panel',
  label: '轮播图',
  jnpfKey: 'carousel',
  title: '轮播图',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-Panel',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
    carouselType: false
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [
      {
        imageUrl: "https://app.cdn.jnpfsoft.com/image/3.2/banner1.png",
        dataType: 2,
        propsApi: '',
        moduleId: "",
        linkType: '1',
        urlAddress: '',
        linkTarget: '_self',
        textDefaultValue: "",
      },
      {
        imageUrl: "https://app.cdn.jnpfsoft.com/image/3.2/banner2.png",
        dataType: 2,
        propsApi: '',
        moduleId: "",
        linkType: '1',
        urlAddress: '',
        linkTarget: '_self',
        textDefaultValue: "",
      },
      {
        imageUrl: "https://app.cdn.jnpfsoft.com/image/3.2/banner4.png",
        dataType: 2,
        propsApi: '',
        moduleId: "",
        linkType: '1',
        urlAddress: '',
        linkTarget: '_self',
        textDefaultValue: "",
      },
    ],
    appDefaultValue: [
      {
        imageUrl: "https://app.cdn.jnpfsoft.com/image/3.2/banner1.png",
        dataType: 2,
        propsApi: '',
        moduleId: "",
        linkType: '1',
        urlAddress: '',
        linkTarget: '_self',
        textDefaultValue: "",
      },
      {
        imageUrl: "https://app.cdn.jnpfsoft.com/image/3.2/banner2.png",
        dataType: 2,
        propsApi: '',
        moduleId: "",
        linkType: '1',
        urlAddress: '',
        linkTarget: '_self',
        textDefaultValue: "",
      },
      {
        imageUrl: "https://app.cdn.jnpfsoft.com/image/3.2/banner4.png",
        dataType: 2,
        propsApi: '',
        moduleId: "",
        linkType: '1',
        urlAddress: '',
        linkTarget: '_self',
        textDefaultValue: "",
      },
    ],
    carouselAutoplay: true,
    carouselDirection: 'horizontal',
    carouselInterval: 3000,
    carouselIndicatorPosition: 'bottomRight',
    carouselArrow: 'never',
    carouselLoop: true,
    imageFillStyle: 'cover',
    textFontSize: 14,
    textFontColor: '#fff',
    textFontWeight: false,
    textFontStyle: false,
    textLeft: 'center',
    textBgColor: "#30313399",
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 6,
  minW: 4,
  minH: 4,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-Panel',
  label: '视频',
  jnpfKey: 'video',
  title: '视频',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-Panel',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 2,
    defaultValue: "",
    videoAutoplay: true,
    playNumber: '2',
    mutePlay: false,
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 6,
  minW: 4,
  minH: 4,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-Panel',
  label: '日程',
  jnpfKey: 'schedule',
  title: "日程",
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-Panel',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 6,
  minH: 8,
  maxW: 12,
  maxH: 20,
  defaultView: "dayGridMonth",
  showLunarCalendar: false,
  firstDay: 0
},
{
  icon: 'icon-ym icon-ym-generator-Panel',
  label: 'iframe',
  jnpfKey: 'iframe',
  title: 'iframe',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-Panel',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  option: {
    defaultValue: "https://www.jnpfsoft.com/",
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
]
// 图表控件 【左面板】
export const chartComponents = [{
  icon: 'icon-ym icon-ym-generator-bar',
  label: '柱状图',
  jnpfKey: 'barChart',
  title: '柱状图',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-bar',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    // 图表标题设置
    titleText: "",  //主标题
    titleTextStyleColor: "#303133", //主标题字体颜色
    titleTextStyleFontSize: 18, //主标题字体大小[12-25px]
    titleTextStyleFontWeight: false,  //主标题是否加粗
    titleLeft: "center", //主子标题位置[left,center,right]
    titleBgColor: '', //主子标题背景色[rgba(),#303133]
    // 图表副标题设置
    titleSubtext: "", //子标题
    titleSubtextStyleColor: "#303133",//子标题字体颜色
    titleSubtextStyleFontSize: 12, //子标题字体大小[12-25px]
    titleSubtextStyleFontWeight: false, //子标题是否加粗
    // 柱体设置
    seriesBarWidth: 30,  //柱体宽度
    seriesItemStyleBarBorderRadius: 0,  //柱体圆角
    // X轴设置
    xAxisName: "",  //X轴名称
    xAxisNameTextStyleFontSize: 14, //X轴名称字体大小
    xAxisNameTextStyleColor: "#303133", //X轴名称字体颜色
    xAxisNameTextStyleFontWeight: false,  //X轴名称是否加粗
    xAxisShow: true,  //X轴是否显示
    category: 'category', //X轴类型[category,value]
    xAxisAxisLineLineStyleColor: '#303133', //X轴线颜色
    xAxisAxisLabelRotate: 0, //X轴标签角度
    xAxisAxisLabelTextStyleFontSize: 14, //X轴标签字体大小
    xAxisAxisLabelTextStyleColor: '#303133', //X轴标签字体颜色
    xAxisAxisLabelTextFontWeight: false, //X轴标签是否加粗
    xAxisSplitLineShow: false,  //X轴网格线
    xAxisSplitLineLineStyleColor: '#DFDFDF', //X轴网格线颜色
    xAxisInverse: false, //X轴反转
    // Y轴设置
    yAxisName: "", //Y轴名称
    yAxisNameTextStyleFontSize: 14, //Y轴名称字体大小
    yAxisNameTextStyleColor: "#303133", //Y轴名称字体颜色
    yAxisNameTextStyleFontWeight: false, //Y轴名称是否加粗
    yAxisShow: true, //Y轴是否显示
    yAxisAxisLineLineStyleColor: '#303133', //Y轴颜色
    yAxisSplitLineShow: true, //Y轴网格线
    yAxisSplitLineLineStyleColor: '#DFDFDF', //Y轴网格线颜色
    yAxisAxisLabelTextStyleFontSize: 14, //Y轴标签字体大小
    yAxisAxisLabelTextStyleColor: '#303133', //Y轴标签字体颜色
    yAxisAxisLabelTextFontWeight: false, //Y轴标签是否加粗
    //数值设置
    seriesLabelShow: true, //显示数值
    seriesLabelFontSize: 14, //数值大小
    seriesLabelFontWeight: false, //数值加粗
    seriesLabelColor: "#303133", //数值颜色
    seriesLabelBgColor: "", //数值背景色
    //提示语设置
    tooltipShow: true,  //提示语显示
    tooltipTextStyleFontSize: 14,  //提示语字体大小
    tooltipTextStyleFontWeight: false, //提示语是否加粗
    tooltipTextStyleColor: "#303133", //提示语字体颜色
    tooltipBgColor: "#fff",//提示语背景颜色
    //坐标轴边距设置
    gridLeft: 20,  //左边距  max:400
    gridTop: 50, //顶边距  max:400
    gridRight: 20, //右边距  max:400
    gridBottom: 20, //底边距  max:400
    //图例设置
    legendShow: true, //显示图例
    legendTextStyleFontSize: 14,  //图例字体大小
    legendOrient: "horizontal", //图例布局[horizontal,vertical]
    legendLeft: 0,  //图例上下边距
    legendTop: 0,//图例左右边距
    //自定义配色
    AxisTextStyleColor: "",   //X、Y轴字体的颜色全局设置
    AxisLineStyleColor: "",   //X、Y轴轴线颜色全局设置
    colorList: [],
    //数据设置（系列）
    barType: []
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-pie',
  label: '饼图',
  jnpfKey: 'pieChart',
  title: '饼图',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-pie',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    roseType: false,
    roseType1: false,
    // 图表标题设置
    titleText: "",  //主标题
    titleTextStyleColor: "#303133", //主标题字体颜色
    titleTextStyleFontSize: 18, //主标题字体大小[12-25px]
    titleTextStyleFontWeight: false,  //主标题是否加粗
    titleLeft: "center", //主子标题位置[left,center,right]
    titleBgColor: '', //主子标题背景色[rgba(),#303133]
    // 图表副标题设置
    titleSubtext: "", //子标题
    titleSubtextStyleColor: "#303133",//子标题字体颜色
    titleSubtextStyleFontSize: 12, //子标题字体大小[12-25px]
    titleSubtextStyleFontWeight: false, //子标题是否加粗
    //数值设置
    seriesLabelShow: true, //显示数值
    seriesLabelPosition: 'outside',
    seriesLabelShowInfo: ['count', 'percent'],
    seriesCenterLeft: 50,
    seriesCenterTop: 50,
    seriesLabelFontSize: 14, //数值大小
    seriesLabelFontWeight: false, //数值加粗
    seriesLabelColor: "#303133", //数值颜色
    seriesLabelBgColor: "", //数值背景色
    seriesLineStyleWidth: 2,
    seriesSymbolRotate: 4,
    //提示语设置
    tooltipShow: true,  //提示语显示
    tooltipTextStyleFontSize: 14,  //提示语字体大小
    tooltipTextStyleFontWeight: false, //提示语是否加粗
    tooltipTextStyleColor: "#303133", //提示语字体颜色
    tooltipBgColor: "#fff",//提示语背景颜色
    //坐标轴边距设置
    gridLeft: 20,  //左边距  max:400
    gridTop: 50, //顶边距  max:400
    gridRight: 20, //右边距  max:400
    gridBottom: 20, //底边距  max:400
    //图例设置
    legendShow: true, //显示图例
    legendTextStyleFontSize: 14,  //图例字体大小
    legendOrient: "horizontal", //图例布局[horizontal,vertical]
    legendLeft: 0,  //图例上下边距
    legendTop: 0,//图例左右边距
    //自定义配色
    AxisTextStyleColor: "",   //X、Y轴字体的颜色全局设置
    AxisLineStyleColor: "",   //X、Y轴轴线颜色全局设置
    colorList: [],
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-line',
  label: '折线图',
  jnpfKey: 'lineChart',
  title: '折线图',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-line',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    areaStyle: false,
    // 图表标题设置
    titleText: "",  //主标题
    titleTextStyleColor: "#303133", //主标题字体颜色
    titleTextStyleFontSize: 18, //主标题字体大小[12-25px]
    titleTextStyleFontWeight: false,  //主标题是否加粗
    titleLeft: "center", //主子标题位置[left,center,right]
    titleBgColor: '', //主子标题背景色[rgba(),#303133]
    // 图表副标题设置
    titleSubtext: "", //子标题
    titleSubtextStyleColor: "#303133",//子标题字体颜色
    titleSubtextStyleFontSize: 12, //子标题字体大小[12-25px]
    titleSubtextStyleFontWeight: false, //子标题是否加粗
    // X轴设置
    xAxisName: "",  //X轴名称
    xAxisNameTextStyleFontSize: 14, //X轴名称字体大小
    xAxisNameTextStyleColor: "#303133", //X轴名称字体颜色
    xAxisNameTextStyleFontWeight: false,  //X轴名称是否加粗
    xAxisShow: true,  //X轴是否显示
    category: 'category', //X轴类型[category,value]
    xAxisAxisLineLineStyleColor: '#303133', //X轴线颜色
    xAxisAxisLabelRotate: 0, //X轴标签角度
    xAxisAxisLabelTextStyleFontSize: 14, //X轴标签字体大小
    xAxisAxisLabelTextStyleColor: '#303133', //X轴标签字体颜色
    xAxisAxisLabelTextFontWeight: false, //X轴标签是否加粗
    xAxisSplitLineShow: false,  //X轴网格线
    xAxisSplitLineLineStyleColor: '#DFDFDF', //X轴网格线颜色
    xAxisInverse: false, //X轴反转
    // Y轴设置
    yAxisName: "", //Y轴名称
    yAxisNameTextStyleFontSize: 14, //Y轴名称字体大小
    yAxisNameTextStyleColor: "#303133", //Y轴名称字体颜色
    yAxisNameTextStyleFontWeight: false, //Y轴名称是否加粗
    yAxisShow: true, //Y轴是否显示
    yAxisAxisLineLineStyleColor: '#303133', //Y轴颜色
    yAxisSplitLineShow: true, //Y轴网格线
    yAxisSplitLineLineStyleColor: '#DFDFDF', //Y轴网格线颜色
    yAxisAxisLabelTextStyleFontSize: 14, //Y轴标签字体大小
    yAxisAxisLabelTextStyleColor: '#303133', //Y轴标签字体颜色
    yAxisAxisLabelTextFontWeight: false, //Y轴标签是否加粗
    //数值设置
    seriesLabelShow: true, //显示数值
    seriesLabelFontSize: 14, //数值大小
    seriesLabelFontWeight: false, //数值加粗
    seriesLabelColor: "#303133", //数值颜色
    seriesLabelBgColor: "", //数值背景色
    seriesLineStyleWidth: 2,
    seriesSymbolRotate: 4,
    //提示语设置
    tooltipShow: true,  //提示语显示
    tooltipTextStyleFontSize: 14,  //提示语字体大小
    tooltipTextStyleFontWeight: false, //提示语是否加粗
    tooltipTextStyleColor: "#303133", //提示语字体颜色
    tooltipBgColor: "#fff",//提示语背景颜色
    //坐标轴边距设置
    gridLeft: 20,  //左边距  max:400
    gridTop: 50, //顶边距  max:400
    gridRight: 20, //右边距  max:400
    gridBottom: 20, //底边距  max:400
    //图例设置
    legendShow: true, //显示图例
    legendTextStyleFontSize: 14,  //图例字体大小
    legendOrient: "horizontal", //图例布局[horizontal,vertical]
    legendLeft: 0,  //图例上下边距
    legendTop: 0,//图例左右边距
    //自定义配色
    AxisTextStyleColor: "",   //X、Y轴字体的颜色全局设置
    AxisLineStyleColor: "",   //X、Y轴轴线颜色全局设置
    colorList: [],
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-radar',//'icon-ym icon-ym-generator-annular',
  label: '雷达图',
  jnpfKey: 'radarChart',
  title: '雷达图',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-radar',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    radarAxisNameFontWeight: false,
    radarAxisNameFontSize: 14,
    radarAxisNameColor: '#303133',
    seriesAreaStyleOpacity: 0.3,
    radarCenterLeft: 50,
    radarCenterTop: 50,
    // 图表标题设置
    titleText: "",  //主标题
    titleTextStyleColor: "#303133", //主标题字体颜色
    titleTextStyleFontSize: 18, //主标题字体大小[12-25px]
    titleTextStyleFontWeight: false,  //主标题是否加粗
    titleLeft: "center", //主子标题位置[left,center,right]
    titleBgColor: '', //主子标题背景色[rgba(),#303133]
    // 图表副标题设置
    titleSubtext: "", //子标题
    titleSubtextStyleColor: "#303133",//子标题字体颜色
    titleSubtextStyleFontSize: 12, //子标题字体大小[12-25px]
    titleSubtextStyleFontWeight: false, //子标题是否加粗
    //数值设置
    seriesLabelShow: true, //显示数值
    seriesLabelFontSize: 14, //数值大小
    seriesLabelFontWeight: false, //数值加粗
    seriesLabelColor: "#303133", //数值颜色
    seriesLabelBgColor: "", //数值背景色
    seriesLineStyleWidth: 2,
    seriesSymbolRotate: 4,
    //提示语设置
    tooltipShow: true,  //提示语显示
    tooltipTextStyleFontSize: 14,  //提示语字体大小
    tooltipTextStyleFontWeight: false, //提示语是否加粗
    tooltipTextStyleColor: "#303133", //提示语字体颜色
    tooltipBgColor: "#fff",//提示语背景颜色
    //坐标轴边距设置
    gridLeft: 20,  //左边距  max:400
    gridTop: 50, //顶边距  max:400
    gridRight: 20, //右边距  max:400
    gridBottom: 20, //底边距  max:400
    //图例设置
    legendShow: true, //显示图例
    legendTextStyleFontSize: 14,  //图例字体大小
    legendOrient: "horizontal", //图例布局[horizontal,vertical]
    legendLeft: 0,  //图例上下边距
    legendTop: 0,//图例左右边距
    //自定义配色
    AxisTextStyleColor: "",   //X、Y轴字体的颜色全局设置
    AxisLineStyleColor: "",   //X、Y轴轴线颜色全局设置
    colorList: [],
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-area',
  label: '地图',
  jnpfKey: 'mapChart',
  title: '地图',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-area',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    mapType: ['100000'],
    mspScale: 1,
    bgColor: '#fff',
    geoAreaColor: '#eee',  //区域颜色
    geoBorderColor: "#666",  //描边线颜色
    geoBorderWidth: 1,  //描边线 0 不显示
    geoLabelShow: false, //区域名称
    geoLabelColor: '#303133', //区域颜色
    geoLabelFontWeight: false, //区域加粗
    geoLabelFontSize: 14, //区域字体
    geoShadowOffset: 0,  //阴影大小
    geoShadowColor: '#000',  //阴影颜色
    geoRoam: true,   //缩放
    geoAspectScale: 0.75,  //地图长宽比
    drillDown: false,//是否下钻
    drillDownFontSize: 14,
    drillDownFontWeight: false,
    drillDownColor: "#303133",
    // 图表标题设置
    titleText: "",  //主标题
    titleTextStyleColor: "#303133", //主标题字体颜色
    titleTextStyleFontSize: 18, //主标题字体大小[12-25px]
    titleTextStyleFontWeight: false,  //主标题是否加粗
    titleLeft: "center", //主子标题位置[left,center,right]
    titleBgColor: '', //主子标题背景色[rgba(),#303133]
    // 图表副标题设置
    titleSubtext: "", //子标题
    titleSubtextStyleColor: "#303133",//子标题字体颜色
    titleSubtextStyleFontSize: 12, //子标题字体大小[12-25px]
    titleSubtextStyleFontWeight: false, //子标题是否加粗
    //提示语设置
    tooltipShow: true,  //提示语显示
    tooltipTextStyleFontSize: 14,  //提示语字体大小
    tooltipTextStyleFontWeight: false, //提示语是否加粗
    tooltipTextStyleColor: "#303133", //提示语字体颜色
    tooltipBgColor: "#fff",//提示语背景颜色
    //坐标轴边距设置
    seriesCenterLeft: 50,  //左边距
    seriesCenterTop: 50,   //右边距
    seriesItemStyleOpacity: 1,  //散点透明度
    seriesType: 'effectScatter', //散点类型
    seriesPointSize: 20,   //热力图点的大小  
    seriesBlurSize: 20,   //热力图点的模糊大小
    seriesMaxOpacity: 1,    //热力图最大透明度
    showNumber: undefined,  //数据显示数量
    autoCarousel: false,   //自动轮播
    autoCarouselTime: 3000,  //自动轮播时间
    visualMapType: 'continuous',   //continuous:连续型视觉  piecewise:分段型视觉
    visualMapMin: 0,    //最小值
    visualMapMax: 200,  //最大值
    // 柱体设置
    seriesBarWidth: 30,  //柱体宽度
    seriesItemStyleBarBorderRadius: 0,  //柱体圆角
    //柱体排名
    barTitleText: "数据统计排名",
    barTitleTextStyleFontSize: '14',
    barTitleTextStyleFontWeight: false,
    barTitleTextStyleColor: "#303133",
    berGridTop: 35, //顶边距 
    berGridRight: 10, //右边距 
    berGridBottom: 180, //底边距 
    updateMapType: ''
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 4,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-radar',
  label: '排行榜',
  jnpfKey: 'rankList',
  title: '排行榜',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-radar',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    columnOptions: [
      { label: "部门", value: "label" },
      { label: "金额", value: "value" }
    ],

  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 4,
  maxW: 12,
  maxH: 20
},
{
  icon: 'icon-ym icon-ym-generator-radar',
  label: '时间轴',
  jnpfKey: 'timeAxis',
  title: '时间轴',
  renderKey: '',
  card: {
    titleFontSize: 14,
    titleFontWeight: false,
    titleFontColor: '#303133',
    titleLeft: 'left',
    titleBgColor: '',
    cardIcon: 'icon-ym icon-ym-generator-radar',
    cardIconColor: "#666",
    linkType: '',
    type: '',
    moduleId: '',
    urlAddress: '',
    linkTarget: '_self',
    appLinkType: '',
    appType: '',
    appModuleId: '',
    appUrlAddress: '',
    appLinkTarget: '_self',
  },
  dataType: 'static',
  propsApi: '',
  option: {
    styleType: 1,
    defaultValue: [],
    layout: 1,
    sortable: 1,
    showNumber: undefined
  },
  refresh: {
    autoRefresh: false,
    autoRefreshTime: 5,
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
}
]

//四个基础图表控件
export const chartList = ['barChart', 'lineChart', 'pieChart', 'radarChart']
//系统控件
export const systemList = ['notice', 'email', 'todoList']
//布局控件
export const layoutList = ['card', 'tab', 'collapse']
//是否需要数据设置控件
export const needDataSetList = ['rankList', 'timeAxis', 'mapChart', ...chartList]
//是否需要分格类型
export const noStyleTypeList = ['text', 'carousel', 'iframe', 'todo', 'commonFunc', 'dataBoard', 'tableList', ...layoutList]

//是否需要mask层控件
export const noNeedMaskList = ['text', 'image', 'carousel', 'video', 'iframe', 'rankList', 'timeAxis', 'schedule', 'tableList', 'mapChart', ...layoutList]

export const needDefaultList = ['text', 'image', 'video', 'rankList', 'timeAxis', 'tableList', 'mapChart', ...chartList]

export const alignList = [
  { label: '左对齐', value: 'left' },
  { label: '居中对齐', value: 'center' },
  { label: '右对齐', value: 'right' }
]
export const underLineList = [
  { label: '无', value: 'none' },
  { label: '下划线', value: 'underline' },
  { label: '删除线', value: 'line-through' }
]
export const linkTypeList = [
  { label: '菜单', value: '1' },
  { label: '外链', value: '2' }
]


export const directionList = [
  { label: '横向', value: 'horizontal' },
  { label: '纵向', value: 'vertical' },
]

export const indicatorPositionList = [
  { label: '无', title: '无', value: 'none' },
  { label: '底部', title: '右侧', value: 'bottomRight' },
  { label: '顶部', title: '左侧', value: 'topLeft' },
]

export const arrowList = [
  { label: '无', value: 'never' },
  { label: '悬停', value: 'hover' },
  { label: '始终', value: 'always' },
]

export const fillStyleList = [
  { label: '适应', value: 'contain' },
  { label: '填充', value: 'cover' },
  { label: '拉伸', value: 'fill' }
]

export const playNumberList = [
  { label: '播放一次', value: '1' },
  { label: '循环播放', value: '2' },
]

export const barStyleList = [
  { label: '基础', value: 1 },
  { label: '堆叠', value: 2 },
  // { label: '动态', value: 3 },
  { label: '背景', value: 4 },
  { label: '对比', value: 5 },
  { label: '正负条', value: 6 },
  { label: '折柱图', value: 7 }
]

export const lineStyleList = [
  { label: '基础', value: 1 },
  { label: '平滑', value: 2 },
  { label: '阶梯', value: 3 },
  { label: '堆叠', value: 4 }
]

export const pieStyleList = [
  { label: '饼图', value: 1 },
  { label: '环形', value: 2 }
]

export const radarStyleList = [
  { label: '基础', value: 1 },
  { label: '圆形', value: 2 }
]

export const rankStyleList = [
  { label: '普通', value: 1 },
  { label: '勋章', value: 2 },
  { label: '奖杯', value: 3 },
  { label: '奖牌', value: 4 }
]

export const timeStyleList = [
  { label: '常规', value: 1 },
  { label: '卡片', value: 2 }
]

export const layoutStyleList = [
  { label: '纵向-左右交错', value: 1 },
  { label: '纵向-右左交错', value: 2 },
  { label: '纵向-轴左侧', value: 3 },
  { label: '纵向-轴右侧', value: 4 },
  { label: '横向-上下交错', value: 5 },
  { label: '横向-下上交错', value: 6 },
  { label: '横向-轴上侧', value: 7 },
  { label: '横向-轴下侧', value: 8 },
]

export const appLayoutStyleList = [
  { label: '纵向-轴左侧', value: 1 },
  { label: '纵向-轴右侧', value: 2 },
  { label: '横向-轴上侧', value: 3 },
  { label: '横向-轴下侧', value: 4 },
]

export const sortList = [
  { label: '升序', value: 1 },
  { label: '降序', value: 2 }
]

export const textStyleList = [
  { label: '文本', value: 1 },
  { label: 'HTML', value: 2 },
]

export const imageStyleList = [
  { label: '本地上传', value: 1 },
  { label: 'URL路径', value: 2 },
  { label: '远端数据', value: 3 }
]

export const videoStyleList = [
  { label: '本地上传', value: 1 },
  { label: 'URL路径', value: 2 },
  { label: '远端数据', value: 3 }
]

export const mapStyleList = [
  { label: '散点', value: 1 },
  { label: '热力', value: 2 },
  { label: '柱形', value: 3 },
  { label: '柱形排名', value: 4 },
]

export const appTodoStyleList = [
  { label: '横向滚动', value: 1 },
  { label: '全部展示', value: 2 },
]

export const commonFuncStyleList = [
  { label: '顶部', value: 1 },
  { label: '靠左', value: 2 },
]

export const dataTypeList = [
  { label: '静态数据', value: 'static' },
  { label: '远端数据', value: 'dynamic' },
]



