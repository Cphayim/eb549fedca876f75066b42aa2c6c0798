// components/hd-label/hd-label.js
/**
 * 标签头组件
 * @Catagory 基础组件
 * @Author Cphayim
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 标题
     * @property {string} title
     */
    title: {
      type: String,
      value: '标题'
    },
    /**
     * 右侧是否显示更多
     * @property {boolean} more
     */
    more: {
      type: Boolean,
      value: false
    },
    /**
     * 右侧文字
     * @property {string} moreText
     */
    moreText: {
      type: String,
      value: '更多'
    },
    /**
     * 目标路由地址
     * 当 more 为 true 时，点击右侧按钮前往的页面路由 url
     * @property route
     */
    routeUrl: {
      type: String,
      value: ''
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
    jumpTo(e) {
      wx.navigateTo({
        url: this.routeUrl
      })
    }
  }
})
