export default {
  weibo: {
    title: '微博',
    icon: 'book',
    component: 'weibo/components/index',
    indexroute: 'weibo/components/_indexroute/index',
    childroutes: {
      add: {
        title: '添加',
        icon: 'plus',
        component: 'weibo/components/add/index'
      }
    }
  }
}
