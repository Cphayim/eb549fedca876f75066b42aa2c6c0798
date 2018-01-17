// pages/hot-store/hot-store.js

/**
 * 热卖商城列表页
 * @Category 业务页
 * @Author Cphayim
 */

import {
  getHotTabInfo
} from '../../api/hot-store-list-api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNames: [],
    tabInfo: []
  },

  /**
   * 获取 tab 数据
   * @private
   * @method _getHotTabInfo
   * @return Promise.state
   */
  _getHotTabInfo() {
    return new Promise((resolve, reject) => {
      getHotTabInfo()
        .then(res => {
          const { data: tabInfo } = res
          // 添加全部到第一项
          tabInfo.unshift({
            Name: '全部',
            Value: 'ShopAll'
          })
          const tabNames = tabInfo.map(item => item.Name)
          this.setData({ tabInfo, tabNames })
          resolve()
        })
    })
  },

  /**
   * 选择 Tab
   * 来自 tab-bar 组件触发
   * @method selectTab
   * @param {object} e
   */
  selectTab(e) {
    console.log(e)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getHotTabInfo()
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