/**
 * confirm-order API
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
  const data = { id: id, openid: wx.getStorageSync('openid') }
  return request({
    url: `${config.host}/ApiOrders/SubmitPay`,
    data
  })
}