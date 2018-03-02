// pages/mine/mine.js

/**
 * 我
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import { getMyInfo } from '../../service/mine.js'
import { toast, modal } from '../../utils/layer.js'

Page({
  pageName: 'mine',

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 查看报名券
   * @method goDetail
   */
  goDetail(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.enrolls[index]
    const jsonData = JSON.stringify({
      Id: item.Id,
      Type: item.QRCodeType,
      OrderItemId: item.OrderItemId
    })
    wx.navigateTo({
      url: `${config.pageOpt.getPageUrl('enroll-detail')}?jsonData=${jsonData}`
    })
  },
  /**
   * 初始化
   * @private
   * @method _init
   */
  _init(isRefresh = false) {
    isRefresh || toast.loading()
    return this._getMyInfo()
      .then(() => toast.hide())
      .catch(err => {
        console.warn(err)
        toast.hide()
      })
  },

  /**
   * 获取'我'的信息
   * @private
   */
  _getMyInfo() {
    toast.loading()
    return getMyInfo()
      .then(({ data }) => {
        toast.hide()
        const { customer, enrolls } = data
        this.setData({ customer, enrolls })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    setTimeout(() => {
      this._init(true).then(res => wx.stopPullDownRefresh())
    }, config.refreshDelay)

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