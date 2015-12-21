export default {
  user: {
    title: '用户',
    component: 'user/components/index',
    indexroute: 'user/components/_indexroute/index',
    childroutes: {
      login: {
        title: '登录',
        component: 'user/components/login/index'
      },
      logout: {
        title: '退出',
        component: 'user/components/logout/index'
      }
    }
  }
}
