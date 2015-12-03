export default {
  about: {
    title: '关于',
    icon: 'info',
    component: 'about/components/index',
    indexroute: 'about/components/_indexroute/index',
    childroutes: {
      address: {
        title: '详细地址',
        icon: 'ellipsis',
        component: 'about/components/address/index'
      },
      contact: {
        title: '联系方式',
        icon: 'mail',
        component: 'about/components/contact/index'
      }
    }
  }
}
