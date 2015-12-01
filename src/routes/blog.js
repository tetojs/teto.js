export default {
  blog: {
    title: '博客',
    component: 'blog/components/index',
    indexroute: 'blog/components/_indexroute/index',
    childroutes: {
      add: {
        title: '添加',
        component: 'blog/components/add/index'
      }
    }
  }
}
