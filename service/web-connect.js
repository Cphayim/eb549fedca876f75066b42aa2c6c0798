import { request } from '../utils/request'
import config from '../config.js'
const reqUrl = '/uc/customers/IsNeedMPAuth'

export default class WebConnect {
  /**
   * 开始
   */
  static start() {
    const wxopenid = wx.getStorageSync('wxopenid')
    return new Promise((resolve, reject) => {
      // 存在 wxopenid
      if (wxopenid) return resolve()

      // 不存在 wxopenid
      // 测试数据
      // const data = {
      //   enable: false,
      //   url: 'http://340.dev.vcar360.com'
      // }
      request({
        url: `${config.host}${reqUrl}`
      }).then(({ data }) => {
        // 若 enable 为 true
        if (data && data.enable) {
          let { url } = data
          url = encodeURIComponent(url)
          console.log(url)
          // 重定向到 web-view 容器页面
          wx.redirectTo({
            url: `${config.pageOpt.getPageUrl('web-view')}?url=${url}`,
          })
        }
        resolve()
      })
    })
  }
}

