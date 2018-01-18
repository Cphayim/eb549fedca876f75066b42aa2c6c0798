// base/tab-bar/tab-bar.js

/**
 * tab-bar 组件
 * @Category 基础组件
 * @Author Cphayim
 */
import { $$$ } from '../../utils/wxml-query.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    animation: {
      type: Boolean,
      value: false
    },
    tabNames: {
      type: Array,
      value: [],
      observer: '_tabNamesChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * 组件节点是否挂载完毕，组件 ready 事件中置为 true
     */
    _isMounted: false,

    /**
     * 标记是否有委托给 ready 钩子的 _setFlagPosition 事务
     * 
     * 作用说明：
     * _tabNamesChange 监听到 tabNams 变化后 
     * 将执行 _setFlagPosition 方法
     * 
     * 在此之前会检测 _isMounted 是否为 true
     * 若 _isMounted 为 false 将不会执行 _setFlagPosition 方法
     * 而将 _isEntrust 置为 true
     * 
     * 组件声明周期函数 ready 执行时会检测 _isEntrust 是否为 true
     * 若 _tabNamesIsChang 为 true 调用 _setFlagPosition 方法
     */
    _isEntrust: false,

    activeIndex: 0,

    flagOffset: 0, // flag 偏移量
    flagScale: 1, // flag 缩放比例
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * tabNames 变化监听
     * @private
     * @method _tabNamesChange
     * @param newVal
     * @param oldVal
     */
    _tabNamesChange(newVal, oldVal) {
      // 如果当前 activeIndex 超出新数组的下标索引，则重置 activeIndex
      if (this.data.activeIndex > newVal.length - 1) {
        this.setData({ activeIndex: 0 })
      }

      // 判断组件节点是否 mounted
      if (this.data._isMounted) {
        setTimeout(() => this._setFlagPosition(),100)
      } else {
        // 委托给 ready 钩子
        this.data._isEntrust = true
      }
    },

    /**
     * 更新标记位置
     * @private
     * @method _setFlagPosition
     */
    _setFlagPosition() {
      this._isEntrust = false
      $$$('.tab-name', this)
        .then(res => {
          if (!res[this.data.activeIndex]) return;
          /**
           * X 轴偏移量为当前 active 的 tab-name 与屏幕左侧的距离
           * 缩放比例为当前 active 的 tab-name 的字长
           */
          const { left: flagOffset, width: flagScale } = res[this.data.activeIndex]
          // console.log(flagOffset, flagScale)
          this.setData({
            flagOffset, flagScale
          })
        })
    },

    /**
     * 选择 Tab
     * @method selectTab
     * @param {object} e 
     */
    selectTab(e) {
      const { index } = e.currentTarget.dataset
      if (index === this.data.activeIndex) return

      this.setData({
        activeIndex: index
      }, function () {
        this._setFlagPosition()
      })

      this.triggerEvent('change', { index })
    }
  },
  /**
   * 组件节点 Mounted 钩子
   */
  ready() {
    // 将组件标记为 mouted 状态
    this.data._isMounted = true

    // 是否有委托的 _setFlagPosition
    if (this.data._isEntrust) {
      this._setFlagPosition()
    }
  }
})
