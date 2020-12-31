// 基础路由
const baseRouter = [{
    path: 'home',
    component: (resolve) => require(['@/views/dashboard'], resolve),
    name: 'Home',
    meta: {
      title: 'Home',
      icon: 'icon-ym icon-ym-nav-home',
      affix: true,
      zhTitle: '首页'
    }
  },
  {
    path: 'dashboard',
    component: (resolve) => require(['@/views/Basic/Dashboard'], resolve),
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'icon-ym icon-ym-generator-kanban',
      affix: true,
      zhTitle: '门户展示'
    }
  },
  {
    path: '/MessageRecord',
    component: (resolve) => require(['@/views/Basic/MessageRecord'], resolve),
    name: 'MessageRecord',
    meta: {
      title: 'MessageRecord',
      affix: false,
      zhTitle: '消息中心',
      icon: 'icon-ym icon-ym-sysNotice',
    }
  },
  {
    path: '/PreviewModel',
    component: (resolve) => require(['@/views/Basic/PreviewModel'], resolve),
    name: 'PreviewModel',
    meta: {
      title: 'PreviewModel',
      affix: false,
      zhTitle: '功能预览',
      icon: 'icon-ym icon-ym-btn-preview',
    }
  },
  {
    path: '/Profile',
    component: (resolve) => require(['@/views/Basic/Profile'], resolve),
    name: 'Profile',
    meta: {
      title: 'Profile',
      affix: false,
      zhTitle: '个人信息',
      icon: 'icon-ym icon-ym-user',
    }
  }
]
export default baseRouter