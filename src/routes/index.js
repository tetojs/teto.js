import blog from './blog'
import about from './about'

export default {
  login: {
    title: '登录',
    component: 'login/components/index'
  },
  '/': {
    title: '首页',
    component: 'home/components/index',
    indexroute: 'home/components/_indexroute/index',
    childroutes: {
      ...blog,
      ...about,
      '*': {
        component: 'error/components/index'
      }
    }
  }
}
