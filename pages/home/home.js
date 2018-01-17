// pages/home/home.js

/**
 * 首页
 * @Category 业务页
 * @Author Cphayim
 */

import {
  getBannerList,
  getTopGoodsList,
  getDealerInfo
} from '../../api/home-api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    topGoodsList: [],
    dealerInfo: {}
  },

  /**
   * 获取首页轮播图数据
   * @private
   * @method _getBannerList
   */
  _getBannerList() {
    getBannerList()
      .then(res => {
        const { data } = res
        const bannerList = data.map((item, index) => {
          return {
            id: item.Id,
            title: item.Title,
            imgUrl: item.TitleImg,
            // 路由跳转
            route: ''
          }
        })
        this.setData({ bannerList })
      })
  },

  /**
   * 获取首页热卖商城 Top 数据
   * @private
   * @method _getTopGoodsList
   */
  _getTopGoodsList() {
    getTopGoodsList()
      .then(res => {
        const { data } = res
        this.setData({
          topGoodsList: data
        })
      })
  },

  /**
   * 获取首页热卖商城 Top 数据
   * @private
   * @method _getTopGoodsList
   */
  _getDealerInfo() {
    getDealerInfo()
      .then(res => {
        const { data } = res
        console.log(data)
        this.setData({
          dealerInfo: data
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getBannerList()
    this._getTopGoodsList()
    this._getDealerInfo()
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