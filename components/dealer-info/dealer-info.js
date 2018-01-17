// components/dealer-info/dealer-info.js
/**
 * 经销商信息组件
 * @Category 业务组件
 * @Author Cphayim
 */
import { modal } from '../../utils/layer.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
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
    callPhone(e) {
      const { phone } = e.currentTarget.dataset
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
        })
      } else {
        modal.alert({ content: '商家未提供联系电话' })
      }
    }
  }
})
