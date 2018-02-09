// pages/success/success.js

/**
 * 支付/报名成功页面
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'

Page({
  pageName: 'success',
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    type: 'reg'
  },

  /**
   * 前往首页
   * @method goHome
   */
  goHome() {
    wx.navigateBack({ delta: (getCurrentPages().length) - 1 })
  },

  /**
   * 前往订单详情
   * @method goDetail
   */
  goDetail() {
    let url = ''
    if (this.data.type === 'reg') { // 报名详情
      url = config.pageOpt.getPageUrl('register-detail')
    } else { // 订单详情
      url = config.pageOpt.getPageUrl('order-detail')
    }
    url += `?id=${this.data.id}`
    wx.redirectTo({ url })
  },

  /**
   * 初始化页面
   * @private
   * @method _init
   */
  _init() {
    console.log('开始处理页面逻辑')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id, type } = options
    this.setData({ id, type })
    let title
    if (type === 'reg') {
      title = '报名成功'
    } else {
      title = '支付成功'
    }
    wx.setNavigationBarTitle({ title })

    if (config.pageOpt.getNeedAuth(this.pageName)) {
      const auth = new Auth()
      auth.validate()
        .then(res => this._init())
        .catch(err => console.log(err))
    } else {
      this._init()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})