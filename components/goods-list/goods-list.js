// components/goods-list/goods-list.js

/**
 * 商品列表组件
 * @Catagory 业务组件
 * @Author Cphayim
 */

import config from '../../config.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal) {
        // console.log(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      // console.log(e.currentTarget.dataset.id)
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: `${config.pageOpt.getPageUrl('store-detail')}?id=${id}`,
        fail: function (res) { console.log(res) }
      })
    }
  }
})
