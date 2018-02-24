// components/security/security.js

/**
 * 商品保障说明组件
 * @Category 业务组件
 * @Author  Cphayim
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    securityList: {
      type: Array,
      value: [],
      observer: 'update'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    securityConfig: {
      '全国联保': './icons/quanguolianbao.png',
      '正品保证': './icons/zhengpinbaozheng.png',
      '厂家质保': './icons/changjiazhibao.png',
      '标准流程': './icons/biaozhunliucheng.png',
      '诚意金可退': './icons/chengyijinketui.png',
    },
    resultList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update() {
      const { securityList, securityConfig } = this.data
      const resultList = []
      securityList.forEach(item => {
        // 有可用配置
        if (securityConfig[item.Name]) {
          resultList.push({
            name: item.Name,
            imgUrl: securityConfig[item.Name]
          })
        }
      })
      this.setData({ resultList })
    }
  }
})
