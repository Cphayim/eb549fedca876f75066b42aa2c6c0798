//app.js

/**
 * 入口文件
 * @Author Cphayim
 */

import config from './config.js'
import { modal } from './utils/layer.js'

App({
  onShow() {
    const systemInfo = wx.getSystemInfoSync()
    if (systemInfo.SDKVersion < '1.9.0') {
      modal
        .alert({ content: '小程序基础库版本过低，请更新微信版本至 v6.6.1 以上' })
        .then(flag => {
          wx.navigateBack({
            delta: 0
          })
        })
    }
  }
})