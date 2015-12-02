export default {
  blog: {
    title: '博客',
    icon: 'book',
    component: 'blog/components/index',
    indexroute: 'blog/components/_indexroute/index',
    childroutes: {
      add: {
        title: '添加',
        icon: 'plus',
        component: 'blog/components/add/index'
      }
    }
  }
}
