// components/tab-btn/tab-btn.js
/**
 * 悬浮 Tab 切换小按钮组件
 * @Catagory 业务组件
 * @Author Cphayim
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'home',
      observer: '_computeTypeRes'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeRes: 'home'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _computeTypeRes(newVal, oldVal) {
      if (newVal !== 'home' && newVal !== 'mine') {
        newVal = 'home'
      }
      this.setData({ typeRes: newVal })
    },
    toggle(e) {
      let routeUrl = '/pages/home/home'

      if (this.data.typeRes === 'mine') {
        routeUrl = '/pages/mine/mine'
      }

      wx.redirectTo({
        url: routeUrl
      })
    }
  }
})
