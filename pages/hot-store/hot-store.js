// pages/hot-store/hot-store.js

/**
 * 热卖商城列表页
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import { toast } from '../../utils/layer.js'
import {
  getHotTabInfo,
  getGoodsList
} from '../../service/hot-store.js'


Page({
  pageName: 'hot-store',
  /**
   * 页面的初始数据
   */
  data: {
    tabInfo: [],
    tabNames: [],
    tabKeys: [],
    activeIndex: 0,
    listsData: []
  },

  _init() {
    this._getHotTabInfo().then(_ => {
      this._getAllListData()
    })
  },

  /**
   * 获取列表数据
   * @private
   * @method _getHotTabInfo
   * @return Promise.state
   */
  _getGoodsList(keyStr) {
    return getGoodsList(keyStr).then(res => res.data.model)
  },
  _getAllListData() {
    const queue = this.data.tabKeys.map(key => this._getGoodsList({ KeyStr: key }))
    Promise.all(queue)
      .then(resAll => {
        this.setData({ listsData: resAll })
        toast.hide()
      })
  },
  /**
   * 获取 tab 数据
   * @private
   * @method _getHotTabInfo
   * @return Promise.state
   */
  _getHotTabInfo() {
    toast.loading()
    return new Promise((resolve, reject) => {
      getHotTabInfo()
        .then(res => {
          const { data: tabInfo } = res
          // 添加全部到第一项
          tabInfo.unshift({
            Value: 'ShopAll',
            Name: '全部'
          })
          const tabNames = tabInfo.map(item => item.Name)
          const tabKeys = tabInfo.map(item => item.Value)
          this.setData({ tabInfo, tabNames, tabKeys })
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
    this.setData({ activeIndex: e.detail.index })
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