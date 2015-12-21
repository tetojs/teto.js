import user from './user'
import weibo from './weibo'
import about from './about'

export default {
  '/': {
    title: '首页',
    component: 'home/components/index',
    indexroute: 'home/components/_indexroute/index',
    childroutes: {
      ...weibo,
      ...about,
      ...user,
      '*': {
        component: 'error/components/index'
      }
    }
  }
}
