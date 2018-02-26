// pages/hot-store/hot-store.js

/**
 * 热卖商城列表页
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import { toast, modal } from '../../utils/layer.js'
import {
  getHotTabInfo,
  getGoodsList,
  getHasOrder,
} from '../../service/hot-store.js'
import { $$ } from '../../utils/wxml-query.js'

Page({
  pageName: 'hot-store',
  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: '', // 顶部 banner url
    tabNames: [], // tab 名
    tabKeys: [], // tab 键值

    activeIndex: 0, // 当前 active 的 tab 索引
    listsData: [], // 全部列表数据
    listsPageNo: [], // 列表的页数
    scrollViewHeight: 0,
  },

  /**
   * 初始化
   * @private 
   * @method _init
   * @return Promise.state
   */
  _init() {
    toast.loading()
    return this._getHotTabInfo()
      .then(_ => {
        return this._getAllListData()
      })
      .then(_ => setTimeout(() => toast.hide(), 1000))
      .catch(err => {
        console.warn(err)
        toast.hide()
      })
  },

  /**
   * 获取列表数据
   * @private
   * @method _getHotTabInfo
   * @param {number} PageNo 当前页数
   * @param {string} KeyStr 当前 tab 键值 
   * @return Promise.state
   */
  _getGoodsList({ PageNo = 1, KeyStr }) {
    console.log(PageNo, KeyStr)
    return getGoodsList({ PageNo, KeyStr }).then(res => res.data)
  },

  /**
   * 获取所有数据
   */
  _getAllListData() {
    // 请求队列
    const queue = this.data.tabKeys.map(key => this._getGoodsList({ KeyStr: key }))
    return Promise.all(queue)
      .then(resAll => {
        this.setData({ listsData: resAll }, () => { this._setScrollViewHeight() })
      })
    console.log(123)
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
          const { subKeys: tabInfo, imageUrl: bannerUrl } = res.data
          // 添加全部到第一项
          tabInfo.unshift({
            Value: 'ShopAll',
            Name: '全部'
          })
          const tabNames = tabInfo.map(item => item.Name)
          const tabKeys = tabInfo.map(item => item.Value)
          this.setData({ tabNames, tabKeys, bannerUrl })
          // 重置列表页数
          this._resetListsPageNo(tabKeys.length)
          resolve()
        })
    })
  },

  /**
   * 重置列表页数
   * @private 
   * @method _resetListsPageNo
   * @param length tab 数量
   */
  _resetListsPageNo(length) {
    this.data.listsPageNo = []
    for (let i = 0; i < length; i++) {
      // 初始化为第一页
      this.data.listsPageNo.push(1)
    }
  },


  /**
   * 设置滚动容器高度
   * @private _setScrollViewHeight
   */
  _setScrollViewHeight() {
    $$('.tab-view-wrap')
      .then(res => {
        const { top: topDis } = res
        const { windowHeight } = wx.getSystemInfoSync()
        this.setData({ scrollViewHeight: windowHeight - topDis })
      })
  },



  /**
   * 滚动加载
   * @loadMore
   */
  loadMore(e) {
    const { index } = e.currentTarget.dataset
    // 当前 tab 的列表数据
    let listData = this.data.listsData[index]
    // 加载下一页数据
    // console.log(this.data.listsPageNo[index])
    toast.loading()
    this._getGoodsList({
      PageNo: ++this.data.listsPageNo[index],
      KeyStr: this.data.tabKeys[index]
    }).then(data => {
      if (!(data instanceof Array) || !data.length) {
        toast.show('没有更多数据了', 1000)
        return
      }
      toast.hide()
      listData = [...listData, ...data]
      this.setData({ [`listsData[${index}]`]: listData })
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
    this._init().then(res => wx.stopPullDownRefresh())
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