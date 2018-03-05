//app.js

/**
 * 入口文件
 * @Author Cphayim
 */

import config from './config.js'
import { modal } from './utils/layer.js'
import WebConnect from './service/web-connect.js'

App({
  onShow() {
    const systemInfo = wx.getSystemInfoSync()
    // 基础库版本检测
    if (systemInfo.SDKVersion < config.supportSDKVersion) {
      return modal
        // 提示版本过低
        .alert({ content: config.error.ERR_VERSION })
        // 退出小程序
        .then(flag => wx.navigateBack({ delta: 0 }))
    }
    // 公众号对接
    WebConnect.start()
  }
})