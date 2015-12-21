export default {
  weibo: {
    title: '微博',
    component: 'weibo/components/index',
    indexroute: 'weibo/components/_indexroute/index',
    childroutes: {
      add: {
        title: '添加',
        component: 'weibo/components/add/index'
      }
    }
  }
}
