export default {
  user: {
    title: '用户',
    icon: 'user',
    component: 'user/components/index',
    indexroute: 'user/components/_indexroute/index',
    childroutes: {
      login: {
        title: '登录',
        icon: 'login',
        component: 'user/components/login/index'
      },
      register: {
        title: '注册',
        icon: 'register',
        component: 'user/components/register/index'
      },
      forgot: {
        title: '忘记密码',
        icon: 'forgot',
        component: 'user/components/forgot/index'
      },
      logout: {
        title: '退出',
        icon: 'logout',
        component: 'user/components/logout/index'
      }
    }
  }
}
