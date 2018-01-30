//app.js

/**
 * 入口文件
 * @Author Cphayim
 */

import config from './config.js'
import { modal } from './utils/layer.js'

App({
  onShow() {
    // 基础库版本检测
    const systemInfo = wx.getSystemInfoSync()
    if (systemInfo.SDKVersion < config.supportSDKVersion) {
      modal
        .alert({ content: config.warning.WARN_VERSION })
        .then(flag => {
          wx.navigateBack({
            delta: 0
          })
        })
    }
  }
})