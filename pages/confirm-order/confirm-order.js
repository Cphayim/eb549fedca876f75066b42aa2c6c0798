// pages/confirm-order/confirm-order.js

/**
 * 确认订单
 * @Catagory 业务页
 * @Author Cphayim
 */
import config from '../../config.js'
import Auth from '../../service/auth.js'
import { toast } from '../../utils/layer.js'

Page({
  pageName: 'confirm-order',

  /**
   * 页面的初始数据
   */
  data: {

  },

  _init() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (config.pageOpt.getNeedAuth(this.pageName)) {
      const auth = new Auth()
      auth.validate()
        .then(res => this._init())
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