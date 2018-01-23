// base/form-control/form-item.js

/**
 * 表单控件项组件
 * @Category 基础组件
 * @Author Cphayim
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 左侧标注
     */
    label: {
      type: String,
      value: '说明'
    },
    /**
     * 右侧是否包含箭头
     */
    arrow: {
      type: Boolean,
      value: false
    },
    /**
     * 自定义 padding
     */
    padding: {
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

  }
})
