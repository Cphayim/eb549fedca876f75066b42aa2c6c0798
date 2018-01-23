// base/num-box/num-box.js

/**
 * 数字选择器组件
 * @Category 基础组件
 * @Author Cphayim
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 最大数
     */
    max: {
      type: Number,
      value: 100
    },
    /**
     * 最小数
     */
    min: {
      type: Number,
      value: 0
    },
    value: {
      type: Number,
      value: 1
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
    increase() {
      const { max, value } = this.data
      if (value >= max) return
      this.triggerEvent('change', this.data.value + 1)
    },
    decrease() {
      const { min, value } = this.data
      if (value <= min) return
      this.triggerEvent('change', this.data.value - 1)
    }
  }
})
