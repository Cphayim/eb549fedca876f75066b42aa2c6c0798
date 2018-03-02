// pages/order-detail/order-detail.js

/**
 * 订单详情
 * @Catagory 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import { getOrderDetail, closeOrder } from '../../service/order-detail.js'
import { toast, modal } from '../../utils/layer.js'

Page({
  pageName: 'order-detail',

  /**
   * 页面的初始数据
   */
  data: {
    id: 0
  },
  /**
   * 取消订单
   */
  closeOrder() {
    toast.loading('正在取消')
    closeOrder(this.data.id)
      .then(({ data }) => {
        toast.hide()
        this.setData({ 'order.Status': 99 })
      })
  },

  /**
   * 返回首页
   */
  goHome() {
    wx.reLaunch({
      url: config.pageOpt.getPageUrl('home')
    })
  },

  /**
   * 发起微信支付
   * @method wxPay
   */
  wxPay(e) {
    const { payConfig } = this.data
    new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: payConfig.TimeStamp,
        nonceStr: payConfig.NonceStr,
        package: payConfig.Package,
        signType: payConfig.SignType,
        paySign: payConfig.PaySign,
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      this.setData({ 'order.Status': 1})
    }).catch(err => {
      console.warn(err)
    })
  },

  /**
   * 前往详情
   * @method goDetail
   */
  goDetail() {
    const { id } = this.data
    const jsonData = JSON.stringify({
      Id: id,
      Type: 4
    })
    wx.redirectTo({
      url: `${config.pageOpt.getPageUrl('enroll-detail')}?jsonData=${jsonData}`
    })
  },

  /**
   * 初始化
   * @private
   * @method _init
   */
  _init() {
    this._getOrderDetail()
  },

  /**
   * 获取订单详情
   */
  _getOrderDetail() {
    getOrderDetail(this.data.id)
      .then(({ data }) => {
        const { order, payConfig } = data
        this.setData({ order, payConfig })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    this.setData({ id })
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
    return {
      title: wx.getExtConfigSync().tanantName,
      path: config.pageOpt.getShareUrl(this.pageName)
    }
  }
})