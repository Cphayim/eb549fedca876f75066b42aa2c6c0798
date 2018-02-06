/**
 * submit-order API
 * @Author Cphayim
 */
import { request } from '../utils/request.js'
import config from '../config.js'

/**
 * 获取 提交订单数据
 * @function getGoodsDetail
 * @param {number} id
 * @return Promise.state
 */
export function getSubmitDetail(id = 0) {
  const data = { articleId: id }
  return request({
    url: `${config.host}/ApiOrders/SubmitDetail`,
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
export function getOptions(){
  return request({
    url: `${config.host}/ApiCustomers/GetOptions`
  })
}