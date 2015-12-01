import user from './user'
import blog from './blog'
import about from './about'

export default {
  ...user,
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
