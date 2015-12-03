export default {
  user: {
    title: '用户',
    icon: 'user',
    component: 'user/components/index',
    indexroute: 'user/components/_indexroute/index',
    childroutes: {
      login: {
        title: '登录',
        icon: 'lock',
        component: 'user/components/login/index'
      },
      logout: {
        title: '退出',
        icon: 'unlock',
        component: 'user/components/logout/index'
      }
    }
  }
}
