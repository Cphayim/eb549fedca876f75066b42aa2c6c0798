// pages/register-detail/register-detail.js
/**
 * 报名券详情
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import { getEnrollDetail } from '../../service/enroll-detail.js'
import { toast, modal } from '../../utils/layer.js'

Page({
  pageName: 'enroll-detail',
  /**
   * 页面的初始数据
   */
  data: {
    needPay: false,
    enrollDetail: {}
  },

  /**
   * 初始化
   * @private
   * @method _init
   */
  _init() {
    this._getEnrollDetail()
  },

  /**
   * 获取报名券数据
   * @private
   * @method _getEnrollDetail
   */
  _getEnrollDetail() {
    toast.loading()
    getEnrollDetail(this.data.reqData)
      .then(({ data }) => {
        toast.hide()
        let needPay
        switch (data.QRCodeType) {
          case 1:
          case 2:
            needPay = false
            break
          case 4:
            needPay = true
            break
        }
        this.setData({ needPay, enrollDetail: data })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const reqData = JSON.parse(options.jsonData)
    this.data.reqData = reqData
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

  }
})