// pages/confirm-order/confirm-order.js

/**
 * 确认订单
 * @Catagory 业务页
 * @Author Cphayim
 */
import config from '../../config.js'
import Auth from '../../service/auth.js'
import { toast, modal } from '../../utils/layer.js'
import { getOrderDetail } from '../../service/confirm-order.js'

Page({
  pageName: 'confirm-order',

  /**
   * 页面的初始数据
   */
  data: {
    id: 0
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
        success: resolve,
        fail: reject
      })
    }).then(res => {
      wx.redirectTo({
        url: `${config.pageOpt.getPageUrl('success')}?id=${this.data.model.Id}&from=order&orderType=4`,
      })
    }).catch(err => console.warn(err))
  },

  /**
   * 初始化页面
   * @private
   * @method _init
   */
  _init() {
    this._getOrderDetail()
  },

  /**
   * 获取订单信息
   * @private
   * @method _init
   */
  _getOrderDetail() {
    toast.loading()
    getOrderDetail(this.data.id)
      .then(({ data }) => {
        toast.hide()
        const { order, payConfig } = data
        this.setData({ model: order, payConfig })
        // 判断是否是已支付的订单
        if (order.Status === 1) {
          wx.redirectTo({
            url: `${config.pageOpt.getPageUrl('success')}?id=${order.Id}&type=order`,
          })
        }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    if (!id) {
      return modal.alert({ content: config.error.ERR_PARAM })
        .then(flag => wx.redirectTo({ url: config.pageOpt.getPageUrl('home') }))
    }
    this.setData({ id: id })

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
    return {
      title: wx.getExtConfigSync().tanantName,
      path: config.pageOpt.getShareUrl(this.pageName)
    }
  }
})