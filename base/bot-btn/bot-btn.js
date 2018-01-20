// base/bot-btn/bot-btn.js
/**
 * 底部按钮组件
 * @Category 基础组件
 * @Author Cphayim
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 是否固定在窗口底部
     */
    fixed: {
      type: Boolean,
      value: false
    },
    /**
     * 是否禁用点击
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * 背景色
     */
    bgColor: {
      type: String,
      value: '#54b4ef'
    },
    /**
     * 文字色
     */
    color: {
      type: String,
      value: '#fff'
    },
    /**
     * 按钮文字
     */
    text: {
      type: String,
      value: '按钮'
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
    tap(e) {
      if(this.data.disabled) return
      this.triggerEvent('emittap',{})
    }
  }
})
