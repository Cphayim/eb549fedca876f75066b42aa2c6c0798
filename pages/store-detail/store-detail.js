// pages/store-detail/store-detail.js

/**
 * 商品详情页
 * @Catagory 业务页
 * @Author   Cphayim
 */
import { toast, modal } from '../../utils/layer.js'
import { getGoodsDetail } from '../../api/store-detail-api.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
  },

  /**
   * 获取商品详情数据
   * @private
   * @method _getGoodsDetail
   */
  _getGoodsDetail() {
    const id = this.data.id
    getGoodsDetail(id)
      .then(res => {
        console.log(res)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取参数 id
    const { id } = options
    this.data.id = id
    // 没有 id 返回上一级
    if (!id) {
      modal
        .alert({ content: '参数错误\n1' })
        .then(_ => {
          wx.navigateBack({ delta: 1 })
        })
      return
    }
    this._getGoodsDetail()
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