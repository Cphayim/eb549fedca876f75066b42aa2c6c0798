/**
 * 用户授权管理模块
 * @Author Cphayim
 */

import config from '../config.js'
import { toast, modal } from '../utils/layer.js'
import { request } from '../utils/request.js'

// 线上
// const loginUrl = `${config.host}/wx/uc/login`

// 开发
// const loginUrl = `https://api.cphayim.me/user/login`
const loginUrl = `${config.host}/uc/customers/wxlogin`

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
export default class Auth {

  constructor() {
    // 已存在实例直接返回
    if (__instance()) return __instance()
    // 将当前 this 绑定到 __instance
    __instance(this)

    this._isValid = false
  }

  /**
   * 获取用户信息
   * @method getUserInfo
   * @param {boolean} withCredentials 是否携带登录态
   * @return Primise.state
   */
  getUserInfo(withCredentials = false) {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials,
        lang: 'zh_CN',
        success: userInfo => resolve(userInfo),
        fail: err => reject(err)
      })
    })
  }

  /**
   * 验证用户信息授权以及登录态
   * @method validate
   * @return Promise.state
   */
  validate() {
    const currentSessionId = this._getSessionId()

    return new Promise((resolve, reject) => {
      if (!wx.getStorageSync('wxopenid')) {
        return reject()
      }
      // 判断缓存是否存在 sessionId
      if (currentSessionId) {
        /**
         * 已存在 sessionId 说明之前有过登录记录
         * 验证已有 sessionId，若成功放行，失败则重新登录
         */
        this._checkSessionId()
          // 当前登录态有效
          .then(() => resolve(true))
          // 当前登录态无效
          .catch(() => this._login())
          // 登录成功
          .then(res => resolve(true))
          // 异常捕获[登录失败]
          .catch(err => reject(err))
      } else {
        /**
         * 不存在 sessionId
         * 检测授权状态（若未授权向用户发起授权）
         * 授权通过后调用登录
         */
        this.getAuth('scope.userInfo')
          // 授权成功，调用登录
          .then(res => this._login())
          // 登录成功
          .then(res => resolve(true))
          // 异常捕获[授权失败/登录失败]
          .catch(err => reject(err))
      }
    })
  }

  /**
   * 获取授权
   * @method getAuth
   * @return Primise.state
   * 返回 resolve 代表授权成功[接收]
   * 返回 reject 代表授权失败[拒绝]
   */
  getAuth(scopeStr = 'scope.userInfo') {
    return new Promise((resolve, reject) => {
      // 从当前的设置记录中获取授权记录对象
      this._getSetting().then(({ authSetting }) => {
        /**
         * authSetting 对象下对应的 'scope.xxx' 分三种情况：
         * 1.为 undefined，说明没有向用户发起过该项授权，
         *   可以直接使用 wx.authorize 发起该项授权
         * 2.为 false，说明之前向用户发起过该项授权但被用户拒绝，
         *   只能使用 wx.openSetting 打开设置窗口让用户手动设置
         * 3.为 true，说明之前向用户发起过该项授权且用户已接收
         */
        if (authSetting[scopeStr]) { // 3
          resolve('authorize:ok')
        }
        else if (authSetting[scopeStr] === false) { // 2
          // 已被拒绝过，弹出模态框提示用户后让其手动设置
          this._secondAuthorize()
            .then(res => resolve(res))
            .catch(err => reject(err))
        }
        else if (authSetting[scopeStr] === undefined) { // 1
          this._sendAuthorize(scopeStr)
            .then(res => resolve(res))
            .catch(err => {
              // 第一次被拒绝后发起第二次授权
              this._secondAuthorize()
                .then(res => resolve(res))
                .catch(err => reject(err))
            })
        }
      })
    })
  }

  /**
   * 获取 sessionId
   * @private
   * @method getSessionId
   * @return string
   */
  _getSessionId() {
    return wx.getStorageSync('session_id') || ''
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

  /**
   * 获取用户设置
   * @private
   * @method _getSetting
   * @return Promise.state
   */
  _getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  }

  /**
   * 发起二次授权
   *（用户拒绝了 first authorize）
   * @private
   * @method _secondAuthorize
   * @param {string} scopeStr [default='scope.userInfo']
   * @return Promise.state
   */
  _secondAuthorize(scopeStr = 'scope.userInfo') {
    return new Promise((resolve, reject) => {
      modal.confirm({
        content: '动动手指，一键授权，更多精彩等着您！',
        confirmText: '去设置',
        cancel: '拒绝'
      }).then(flag => {
        if (!flag) return reject('authorize:fail auth deny')
        this._sendAuthorize(scopeStr, false)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    })
  }

  /**
   * 发起授权邀请
   * 向用户发起授权邀请
   * @private
   * @method _sendAuthorize
   * @param {string} scopeStr [default='scope.userInfo']
   * @param {boolean} isFirst 是否是第一次发起
   *  scope 参数参考 https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html
   * @return Promise.state
   */
  _sendAuthorize(scopeStr = 'scope.userInfo', isFirst = true) {

    return new Promise((resolve, reject) => {
      if (isFirst) { // 发起 wx.authorize
        wx.authorize({
          scope: scopeStr,
          success: res => resolve('authorize:ok'),
          fail: err => reject('authorize:fail auth deny')
        })
      } else { // 打开设置窗口等待用户设置
        wx.openSetting({
          success: res => {
            const { authSetting } = res
            if (authSetting[scopeStr]) { resolve('authorize:ok') }
            else { reject('authorize:fail auth deny') }
          },
          fail: err => reject(err.errMsg)
        })
      }
    })
  }

  /**
   * 发起服务器登录
   * @private
   * @method _login
   * @return Promise.state
   */
  _login() {
    return new Promise((resolve, reject) => {
      toast.loading('正在登录')
      let codeStr = ''
      this._wxlogin()
        .then(code => {
          codeStr = code
          return this.getUserInfo(true)
        })
        .then(data => {
          data.code = codeStr
          data.appId = wx.getExtConfigSync().appid || ''
          data.wxopenid = wx.getStorageSync('wxopenid') || ''
          return request({
            url: loginUrl,
            data
          })
        })
        // 登录成功
        .then(res => {
          wx.setStorageSync('openid', res.data.openId)
          toast.hide()
          const { data } = res
          console.log(res)
          this._setSessionId(data.sessionId)
          resolve('login:ok')
        })
        // 异常捕获[微信登录失败/服务器登录失败]
        .catch(err => reject(err))
    })
  }

  /**
   * 发起微信登录
   * 返回 code
   * @private
   * @method _wxlogin
   * @return Promise.state
   */
  _wxlogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        // {errMsg: "login:ok", code: "071sqFiS0qLqG92rtyjS0mVkiS0sqFib"}
        success: res => {
          resolve(res.code)
        },
        fail: err => reject(err)
      })
    })
  }
}