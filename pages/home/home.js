// pages/home/home.js

/**
 * 首页
 * @Author Cphayim
 */

import { getBannerList, getTopGoodsList } from '../../api/home-api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    topGoodsList: []
  },

  /**
   * 获取首页轮播图数据
   * @method _getBannerList
   * @private
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
   * @method _getTopGoodsList
   * @private
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getBannerList()
    this._getTopGoodsList()
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