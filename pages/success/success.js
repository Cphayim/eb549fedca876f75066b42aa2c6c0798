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
  onLoad: function (options) {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})