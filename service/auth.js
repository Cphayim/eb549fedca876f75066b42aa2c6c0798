/**
 * 用户授权管理模块
 * @Author Cphayim
 */
import config from '../config.js'


const __instance = (function () {
  let instance
  return (newInstance) => {
    if (newInstance) instance = newInstance
    return instance
  }
}())

/**
 * @class Auth [单例]
 * @desc 用于创建一个授权对象
 */
export class Auth {

  constructor() {
    // 已存在实例直接返回
    if (__instance()) return __instance()
    // 将当前 this 绑定到 __instance
    __instance(this)

    this._isValid = false
  }

  /**
   * 获取 sessionId
   * @method getSessionId
   * @return {string}
   */
  getSessionId() {
    return wx.getStorageSync('session_id') || ''
  }

  /**
   * 获取用户信息
   * @method getUserInfo
   * @return Primise.state
   */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: userInfo => resolve(userInfo),
        fail: err => reject(err)
      })
    })
  }

  /**
   * 设置 sessionId
   * @private
   * @method _setSessionId 
   * @param {string} sessionId
   */
  _setSessionId(sessionId) {
    wx.setStorageSync('session_id', sessionId)
  }

  /**
   * 获取用户设置
   * @private
   * @method _getSetting
   * @return Promise.state
   */
  _getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: authSetting => resolve(authSetting),
        fail: err => reject(err)
      })
    })
  }

  /**
   * 验证
   * 执行 auth 验证，包括授权操作和登录操作
   * @method validate
   * @return Promise.state
   */
  validate() {
    const currentSessionId = this.getSessionId()
    return new Promise((resolve, reject) => {
      // 判断缓存是否存在 sessionId
      if (currentSessionId) {
        // session 验证
        this._checkSessionId()
          .then(() => resolve(true)) // 放行
          .catch(() => this._wxlogin())
      } else {
        
      }
    })

  }

  /**
   * 发起授权邀请
   * 向用户发起授权邀请
   * @method _sendAuthorize
   * @param {string} scopeStr [default='scope.userInfo']
   *  scope 参数参考 https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html
   * @return Promise.state
   */
  _sendAuthorize(scopeStr = 'scope.userInfo') {

  }

  /**
   * 发起微信登录
   */
  _wxlogin() {
    console.log('开始登录了')
  }

  /**
   * 确认微信服务器的 sessionId 是否过期
   * @private
   * @merberof
   * @method _checkSessionId
   * @return Promise.state
   */
  _checkSessionId() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: () => resolve(),
        fail: () => reject()
      })
    })
  }

}