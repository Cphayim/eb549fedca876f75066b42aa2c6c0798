// pages/submit-register/submit-register.js

/**
 * 提交报名订单页面
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import {
  getInitOrderDetail,
  getInitRegisterDetail,
  getPres,
  getAfters,
  getInsurers,
  getCarCates,
  getOptions,
  createForPay,
} from '../../service/submit-order.js'
import { modal } from '../../utils/layer.js'

Page({
  pageName: 'submit-order',

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    // 是否需要支付
    needPay: false,
    // 是否绑定了顾问
    bindEmployee: false,
    // 订单类型，1为售前，2为售后
    orderType: 0,

    // 顾问列表 picker
    employeeList: [],
    employeeIndex: 0,

    // 车系|车型列表 picker
    carBrands: [], // 原数据
    carBrandsRange: [], // format 后用于 picker 的数据
    carBrandIndex: 0,
    carModelIndex: 0,
    carModelStr: '', // 显示用字符串

    // 购车方式 picker
    buyWayRange: [{ Name: '贷款', Value: true }, { Name: '全款', Value: false }],
    buyWayRangeIndex: 0,

    // 购车时间 picker
    buyTimeRange: [],
    buyTimeRangeIndex: 0,
  },

  /**
   * 购买数量变化
   * @method changeCount
   * @param {object} e
   */
  changeCount(e) {
    const { detail: value } = e
    this.setData({
      'model.Count': value
    })
  },

  /**
   * 选择顾问变化
   * @method changeEmployee
   * @param {object} e
   */
  changeEmployee(e) {
    const index = ~~e.detail.value
    // 修改显示的顾问名
    const { Name: name, Id: id } = this.data.employeeList[index]
    this.setData({
      'model.EmployeeId': id,
      employeeName: name,
      employeeIndex: index
    })
  },

  /**
   * 购车时间变化
   * @method changeBuyTimeRange
   * @param {object} e
   */
  changeBuyTimeRange(e) {
    const index = ~~e.detail.value,
      value = this.data.buyTimeRange[index].Value
    this.setData({
      'model.BuyTimeRange': value,
      buyTimeRangeIndex: index
    })
  },

  /**
   * 购车方式变化
   * @method changeBuyWayRange
   * @param {object} e
   */
  changeBuyWayRange(e) {
    const index = ~~e.detail.value,
      value = this.data.buyWayRange[index].Value
    this.setData({
      'model.IsLoan': value,
      buyWayRangeIndex: index
    })
  },

  /**
   * 车系变化(第一列)
   * @method changeCarBrand
   * @param {object} e
   */
  changeCarBrand(e) {
    const { column, value } = e.detail
    // colum 不为 0, 或当前车系为变动的车系
    console.log(value)
    if (column || value === this.data.carBrandIndex) return
    // 更新车型 range
    const { carBrandsRange } = this.data
    carBrandsRange.pop()
    carBrandsRange.push(this.data.carBrands[value].Children)
    this.setData({ carBrandsRange, carBrandIndex: value })
  },

  /**
   * 车型变化(第二列)
   * @method changeCarModel
   * @param {object} e
   */
  changeCarModel(e) {
    const [carBrandIndex, carModelIndex] = e.detail.value
    const { carBrands } = this.data

    const brandName = carBrands[carBrandIndex].Name,
      brandId = carBrands[carBrandIndex].Id,
      modelName = carBrands[carBrandIndex].Children[carModelIndex].Name,
      modelId = carBrands[carBrandIndex].Children[carModelIndex].Id

    const carModelStr = `${brandName} - ${modelName}`

    if (this.data.orderType === 1) { // 售前
      this.setData({
        'model.CarBrandId': brandId,
        'model.CarModelId': modelId
      })
    } else if (this.data.orderType === 2) { // 售后
      this.setData({
        'model.MyCarBrandId': brandId,
        'model.MyCarModelId': modelId
      })
    }

    this.setData({ carModelStr })
  },

  /**
   * 输入框变化值同步
   * @method changeInput
   * @param {object} e
   */
  changeInput(e) {
    console.log(e)
    const value = e.detail.value,
      name = e.currentTarget.dataset.name
    this.setData({
      ['model.' + name]: value
    })
  },

  /**
   * 创建订单
   * @method creatOrder
   * @param {object} e
   */
  createOrder(e) {
    // 表单验证
    this._formValid().then(res => {
      const { model } = this.data
      if (this.data.needPay) { // 支付类型
        createForPay(model).then(res => {
          const { data } = res
          if (typeof data === 'number') { // 经销商未开通微信支付
            modal.alert({ content: '商家尚未开通微信支付' })
          } else { // 前往确认订单页面
            wx.redirectTo({
              url: `${config.pageOpt.getPageUrl('confirm-order')}?id=${data.Id}`
            })
          }
        })
      } else { // 报名类型

      }

    }).catch(err => { // 捕获异常
      console.warn(`createOrder Error: ${err}`)
    })
  },

  /**
   * 表单验证
   * @private
   * @method _formValid
   * @return Promise.state
   */
  _formValid() {
    const { model } = this.data
    const reg = {
      name: /^[\w\u4e00-\u9fa5]{2,}$/, // 两位以上中英文数字
      phone: /^0?1[345789]\d{9}$/
    }
    return new Promise((resolve, reject) => {
      if (!model.EmployeeId) {
        modal.alert({ content: '请选择顾问' })
        return reject('未选择顾问')
      }
      if (!reg.name.test(model.Name)) {
        modal.alert({ content: '请输入有效姓名' })
        return reject('姓名无效')
      }
      if (!reg.phone.test(model.MobilePhone)) {
        modal.alert({ content: '请输入有效手机号' })
        return reject('手机号无效')
      }

      if (this.data.orderType === 1) { // 售前
        if (!model.CarBrandId || !model.CarModelId) {
          modal.alert({ content: '请选择车型' })
          return reject('未选择车型')
        }
      } else if (this.data.orderType === 2) { // 售后
        if (!model.MyCarBrandId || !model.MyCarModelId) {
          modal.alert({ content: '请选择车型' })
          return reject('未选择车型')
        }
      }

      resolve()
    })
  },

  /**
   * 初始化页面
   * @private
   * @method _init
   */
  _init() {
    new Promise((resolve, reject) => {
      if (this.data.needPay) { // 支付类型
        this._getInitOrderDetail()
          .then(res => resolve())
      } else { // 报名类型
        this._getInitRegisterDetail()
          .then(res => resolve())
      }
    }).then(() => this._initState())
  },

  /**
   * 初始化状态
   * @private
   * @method _initState
   */
  _initState() {
    // 是否已经绑定顾问
    const bindEmployee = !!this.data.model.EmployeeId,
      { OrderType: orderType, OrderFrom: orderFrom } = this.data.model
    let employeeName
    if (orderType === 1) { // 售前
      employeeName = this.data.customer.PreEmployeeName
    } else if (orderType === 2 && orderFrom === 10) { // 续保
      employeeName = this.data.customer.InsurerEmployeeName
    } else { // 售后
      employeeName = this.data.customer.AfterEmployeeName
    }

    this.setData({ bindEmployee, orderType, employeeName })

    // 获取顾问列表
    this._getEmployees()
    // 获取意向车型列表
    this._getCarCates()
    // 获取其它选项配置
    this._getOptions()
  },

  /**
   * 获取支付类型订单数据
   * @private
   * @method _getInitOrderDetail
   * @return Promise.state
   */
  _getInitOrderDetail() {
    return getInitOrderDetail(this.data.id)
      .then(res => {
        const { article, model, customer, maxBuyCount } = res.data

        /**默认值补充**/
        model.IsLoan = true
        model.BuyTimeRange = -1
        /**默认值补充**/

        this.setData({
          article, model, customer, maxBuyCount
        })
        return Promise.resolve()
      })
  },

  /**
   * 获取报名类型订单数据
   * @private
   * @method _getInitRegisterDetail
   * @return Promise.state
   */
  _getInitRegisterDetail() {
    return getInitRegisterDetail(this.data.id)
      .then(res => {
        const { customer, Pre } = res.data

        /**默认值补充**/
        model.IsLoan = true
        model.BuyTimeRange = -1
        /**默认值补充**/

        this.setData({
          article, model, customer, maxBuyCount
        })
        return Promise.resolve()
      })
  },

  /**
   * 获取顾问信息列表
   * @private
   * @method _getEmployees
   */
  _getEmployees() {
    new Promise((resolve, reject) => {
      const { OrderType: orderType, OrderFrom: orderFrom } = this.data.model
      if (orderType === 1) {
        // 售前业务
        getPres().then(res => resolve(res))
      }
      else if (orderType === 2 && orderFrom === 10) {
        // 续保业务
        getInsurers().then(res => resolve(res))
      }
      else {
        // 售后业务
        getAfters().then().then(res => resolve(res))
      }
    }).then(res => {
      this.setData({
        employeeList: res.data
      })
    })
  },

  /**
   * 获取意向车型列表
   * @private
   * @method _getCarCates
   */
  _getCarCates() {
    const { orderType } = this.data
    let type = 'Pre'
    if (orderType === 2) {
      type = 'After'
    }
    getCarCates(type)
      .then(res => {
        const carBrands = res.data.CarBrands
        /****/
        const carBrandsRange = []
        carBrandsRange.push(carBrands)
        carBrandsRange.push(carBrands[0].Children)
        /****/
        this.setData({
          carBrands,
          carBrandsRange
        })
      })
  },

  /**
   * 获取其它选项配置
   * @private
   * @method _getOptions
   */
  _getOptions() {
    getOptions()
      .then(res => {
        const { buyTimeRange } = res.data
        this.setData({
          buyTimeRange
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id, needPay } = options
    needPay = needPay === 'false' ? false : true
    if (!id) {
      return modal.alert({ content: config.error.ERR_PARAM })
        .then(flag => wx.redirectTo({ url: config.pageOpt.getPageUrl('home') }))
    }
    this.setData({ id, needPay })

    if (config.pageOpt.getNeedAuth(this.pageName)) {
      const auth = new Auth()
      auth.validate()
        .then(res => this._init())
        .catch(err => console.log(err))
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

  }
})