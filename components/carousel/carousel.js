// components/carousel/carousel.js

/**
 * 轮播组件
 * @Author Cphayim
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 轮播组件数据
     * @property list
     * list:[
     *  {
     *    id: [String, Number], // 唯一标识
     *    title: String,        // 标题
     *    imgUrl: String,       // 图片 url
     *    route: Boolean,       // 点击图片是否路由跳转
     *    routeUrl: String      // 目标路由 url(小程序内)
     *  }
     * ]
     */
    list: { type: Array, value: [] },
    indicatorDots: { type: Boolean, value: true },
    indicatorColor: { type: String, value: 'rgba(0, 0, 0, .3)' },
    indicatorActiveColor: { type: String, value: '#000000' },
    autoplay: { type: Boolean, value: false },
    current: { type: Number, value: 0 },
    interval: { type: Number, value: 4000 },
    duration: { type: Number, value: 500 },
    circular: { type: Boolean, value: true },
    vertical: { type: Boolean, value: false }
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
    _currentChange(e) {
      const { current, source } = e.detail
      // console.log(current, source)
    }
  }
})
