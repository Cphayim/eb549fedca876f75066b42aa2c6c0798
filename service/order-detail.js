/**
 * order-detail API
 * @Author Cphayim
 */
import { request } from '../utils/request.js'
import config from '../config.js'

/**
 * 获取订单信息
 * @function getOrderDetail
 * @param {number} id
 * @return Promise.state
 */
export function getOrderDetail(id = 0) {
  const data = { id: id }
  return request({
    url: `${config.host}/ApiOrders/SubmitPay`,
    data
  })
}

/**
 * 取消订单
 * @function closeOrder
 * @param {number} id
 * @return Primise.state
 */
export function closeOrder(id = 0) {
  const data = { id: id }
  return request({
    url: `${config.host}/Biz/Orders/CloseOrder?isXCX=true`,
    data
  })
}