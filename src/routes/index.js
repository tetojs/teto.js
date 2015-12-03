import user from './user'
import weibo from './weibo'
import about from './about'

export default {
  ...user,
  '/': {
    title: '首页',
    icon: 'home',
    component: 'home/components/index',
    indexroute: 'home/components/_indexroute/index',
    childroutes: {
      ...weibo,
      ...about,
      '*': {
        component: 'error/components/index'
      }
    }
  }
}
