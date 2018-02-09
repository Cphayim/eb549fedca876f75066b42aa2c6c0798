/**
 * submit-order API
 * @Author Cphayim
 */
import { request } from '../utils/request.js'
import config from '../config.js'

/**
 * 获取支付类型订单初始数据
 * @function getInitOrderDetail
 * @param {number} id
 * @return Promise.state
 */
export function getInitOrderDetail(id = 0) {
  const data = { articleId: id }
  return request({
    url: `${config.host}/ApiOrders/SubmitDetail`,
    data
  })
}

/**
 * 获取报名类型订单初始数据
 * @function getInitRegisterDetail
 * @param {number} id
 * @return Promise.state
 */
export function getInitRegisterDetail(id = 0) {
  const data = {id : id}
  return request({
    url: `${config.host}/ApiArticles/SubmitEnroll`,
    data
  })
}

/**
 * 获取销售顾问列表
 * @function getPres
 * @return Promise.state
 */
export function getPres() {
  return request({
    url: `${config.host}/Org/Employees/ReadForPre`
  })
}

/**
 * 获取售后顾问列表
 * @function getAfters
 * @return Promise.state
 */
export function getAfters() {
  return request({
    url: `${config.host}/Org/Employees/ReadForAfter`
  })
}

/**
 * 获取保险专员列表
 * @function getInsurers
 * @return Promise.state
 */
export function getInsurers() {
  return request({
    url: `${config.host}/Org/Employees/ReadForInsurer`
  })
}

/**
 * 获取意向车型列表
 * @function getCarCates
 * @param {string} type ['Pre'|'After']
 * @return Promise.state
 */
export function getCarCates(type = 'Pre') {
  if (type !== 'Pre' && type !== 'After') {
    type = 'Pre'
  }
  return request({
    url: `${config.host}/car/CarBrands/CarSelectForSEC?role=${type}&dataType=zsd&isXCX=true`,
  })
}

/**
 * 获取其它选项配置
 * @function getOptions
 * @return Promise.state
 */
export function getOptions() {
  return request({
    url: `${config.host}/ApiCustomers/GetOptions`
  })
}

/**
 * 创建支付订单
 * @function createForPay
 * @param {object} model
 * @return Promise.state
 */
export function createForPay(model) {
  const data = model
  return request({
    url: `${config.host}/Biz/Orders/CreateForPay?isXCX=true`,
    data
  })
}

/**
 * 创建报名订单（售前）
 * @function createRegPre
 * @param {object} model
 * @return Promise.state
 */
export function createRegPre(model) {
  const data = model
  return request({
    url: `${config.host}/Biz/OpportunityPres/Create?isXCX=true`,
    data
  })
}

/**
 * 创建报名订单（售后）
 * @function createRegAfter
 * @param {object} model
 * @return Promise.state
 */
export function createRegAfter(model) {
  const data = model
  return request({
    url: `${config.host}/Biz/OpportunityAfters/Create?isXCX=true`,
    data
  })
}
