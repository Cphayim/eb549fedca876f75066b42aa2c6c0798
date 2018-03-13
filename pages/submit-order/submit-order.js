// pages/submit-order/submit-order.js

/**
 * 提交支付订单页面
 * @Category 业务页
 * @Author Cphayim
 */

import config from '../../config.js'
import Auth from '../../service/auth.js'
import {
  getInitOrderDetail,
  getEmployees,
  getCarCates,
  getOptions,
  createForPay,
} from '../../service/submit-order.js'
import { toast, modal } from '../../utils/layer.js'

Page({
  pageName: 'submit-order',

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    // 订单类型，1为售前，2为售后
    orderType: 0,
    // 是否是续保
    isInsurer: false,

    // 是否绑定了顾问, 若绑定了顾问则禁用选择顾问 picker
    bindEmployee: false,
    // 顾问列表 picker
    employeeList: [],
    employeeObj: {},
    employeeIndex: 0,

    // 车系/车型
    carBrandList: [],
    carBrandIndex: 0,
    carModelIndex: 0,

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
    const { Id: id } = this.data.employeeList[index]
    this.setData({
      'model.EmployeeId': id,
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
   * 车系变化
   * @method changeCarBrand
   * @param {object} e
   */
  changeCarBrand(e) {
    const { value } = e.detail
    this.setData({
      carBrandIndex: value,
      carModelIndex: 0, // 重置车型
      'model.CarBrandId': this.data.carBrandList[value].Id,
      'model.CarModelId': null
    })
  },

  /**
   * 车型变化
   * @method changeCarModel
   * @param {object} e
   */
  changeCarModel(e) {
    const { value } = e.detail
    console.log(value)
    this.setData({
      carModelIndex: value,
      'model.CarModelId': this.data.carBrandList[this.data.carBrandIndex].Children[value].Id
    })
  },

  /**
   * 输入框变化值同步
   * @method changeInput
   * @param {object} e
   */
  changeInput(e) {
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
    toast.loading('生成订单中')
    // 表单验证
    this._formValid().then(res => {
      const { model } = this.data
      // 传递本地的 openid 
      model.OpenId = wx.getStorageSync('openid')
      model.payment = "小程序支付"
      createForPay(model).then(res => {
        toast.hide()
        const { data } = res
        if (typeof data === 'number') { // 经销商未开通微信支付
          modal.alert({ content: '商家尚未开通微信支付' })
        } else { // 前往确认订单页面
          wx.redirectTo({
            url: `${config.pageOpt.getPageUrl('confirm-order')}?id=${data.Id}`
          })
        }
      })
    }).catch(err => { // 捕获异常
      toast.hide()
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
      phone: /^0?1[345789]\d{9}$/,
      card: /^(京|津|冀|晋|蒙|辽|吉|黑|沪|苏|浙|皖|闽|赣|鲁|豫|鄂|湘|粤|桂|琼|渝|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|军|北|南|广|沈|成|兰|济|空|海){1}[A-Z_a-z]{1}[A-Z_a-z_0-9]{5}$/,
    }
    return new Promise((resolve, reject) => {
      // 判断是否是续保业务
      if (this.data.isInsurer) {
        // 如果续保业务顾问列表长度为0，不检测
        if (this.data.employeeList.length) {
          if (!model.EmployeeId) {
            modal.alert({ content: '请选择专员' })
            return reject('未选择专员')
          }
        }
      } else {
        if (!model.EmployeeId) {
          modal.alert({ content: '请选择顾问' })
          return reject('未选择顾问')
        }
      }

      if (!reg.name.test(model.Name)) {
        modal.alert({ content: '请输入有效姓名' })
        return reject('姓名无效')
      }

      if (!reg.phone.test(model.MobilePhone)) {
        modal.alert({ content: '请输入有效手机号' })
        return reject('手机号无效')
      }

      // 车系必选，车型非必须选
      if (!model.CarBrandId) {
        modal.alert({ content: '请选择车系' })
        return reject('未选择车系')
      }

      if (this.data.orderType === 1) { // 售前

      } else if (this.data.orderType === 2) { // 售后
        if (!reg.card.test(model.License)) {
          modal.alert({ content: '请输入有效车牌号' })
          return reject('车牌号无效')
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
    this._getInitDetail()
      .then(res => this._initState())
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

    this.setData({ bindEmployee, orderType })

    // 获取顾问列表
    this._getEmployees()
    // 获取意向车型列表
    this._getCarCates()
    // 获取其它选项配置
    this._getOptions()
  },

  /**
   * 获取订单数据
   * @private
   * @method _getInitOrderDetail
   * @return Promise.state
   */
  _getInitDetail() {
    toast.loading()
    return getInitOrderDetail(this.data.id)
      .then(res => {
        const { article, model, customer, maxBuyCount } = res.data

        /**默认值补充**/
        model.Name = model.Name || ''
        model.MobilePhone = model.MobilePhone || ''
        model.IsLoan = true
        model.BuyTimeRange = -1
        /**默认值补充**/
        setTimeout(_ => toast.hide(), 500)
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
        getEmployees('sale').then(resolve)
      }
      else if (orderType === 2 && orderFrom === 10) {
        // 续保业务
        this.setData({ isInsurer: true })
        getEmployees('insurer').then(resolve)
      }
      else {
        // 售后业务
        getEmployees('service').then(resolve)
      }
    }).then(({ data: employeeList }) => {
      const employeeObj = {}
      employeeList.forEach(item => {
        employeeObj[item.Id] = item.Name
      })
      this.setData({
        // 顾问列表
        employeeList,
        employeeObj
      })

      /**
       * 判断已绑定的顾问是否在顾问列表中(判断是否离职)
       * 若已绑定的顾问离职可重新选择顾问
       */
      if (!employeeObj[this.data.model.EmployeeId]) {
        // 过滤掉休假状态的员工
        employeeList = employeeList.filter(item => item.Status === 1)
        // 打开选择器
        this.setData({ bindEmployee: false, employeeList, 'model.EmployeeId': null })
      }
    })
  },

  /**
   * 获取意向车型列表
   * @private
   * @method _getCarCates
   */
  _getCarCates() {
    const { orderType } = this.data
    // 售前/售后车型
    let type = 'Pre'
    if (orderType === 2) {
      type = 'After'
    }
    getCarCates(type)
      .then(res => {
        // 车系列表
        const carBrandList = res.data.CarBrands

        carBrandList.unshift({
          Name: '请选择车系',
          Id: null,
          Children: []
        })

        /**
         * 添加默认值
         */
        carBrandList.forEach(item => item.Children.unshift({ Name: '暂不选择车型', Id: null }))

        this.setData({ carBrandList })
        console.log(carBrandList)

        // 设置默认值
        const carBrandId = this.data.model.CarBrandId
        const carModelId = this.data.model.CarModelId

        console.log(carBrandId, carModelId)

        // 绑定默认值
        if (carBrandId) {
          // 车系
          let i;
          for (i = 0; i < carBrandList.length; i++) {
            if (carBrandList[i].Id === carBrandId) {
              this.setData({
                carBrandIndex: i
              })
              break
            }
          }

          // 车型
          if (i) {
            const carModelList = carBrandList[i].Children
            for (let j = 0; j < carModelList.length; j++) {
              if (carModelList[j].Id === carModelId) {
                this.setData({
                  carModelIndex: j
                })
                break
              }
            }
          }
        }
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
  onLoad(options) {
    let { id } = options
    if (!id) {
      return modal.alert({ content: config.error.ERR_PARAM })
        .then(flag => wx.redirectTo({ url: config.pageOpt.getPageUrl('home') }))
    }
    this.setData({ id })

    if (config.pageOpt.getNeedAuth(this.pageName)) {
      const auth = new Auth()
      auth.validate()
        .then(res => this._init())
        .catch(err => console.warn(err))
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