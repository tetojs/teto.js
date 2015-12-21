export default {
  about: {
    title: '关于',
    component: 'about/components/index',
    indexroute: 'about/components/_indexroute/index',
    childroutes: {
      address: {
        title: '详细地址',
        component: 'about/components/address/index'
      },
      contact: {
        title: '联系方式',
        component: 'about/components/contact/index'
      }
    }
  }
}
