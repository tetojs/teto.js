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
      register: {
        title: '注册',
        component: 'user/components/register/index'
      },
      forgot: {
        title: '忘记密码',
        component: 'user/components/forgot/index'
      },
      logout: {
        title: '退出',
        component: 'user/components/logout/index'
      }
    }
  }
}
