/**
 * 热卖商城详情请求 API
 * @Author Cphayim
 */
import { request } from '../utils/request.js'
import config from '../config.js'

/**
 * 获取 商品详情 数据
 * @function getGoodsDetail
 * @param {number} id
 * @return Promise.state
 */
export function getGoodsDetail(id = 0) {
  const data = { id }
  return request({
    url: `${config.host}/ApiArticles/DetailForShop`,
    data
  })
}

/**
 * 获取是否有未完成订单
 * @function getHasOrder
 * @return Promise.state
 */
export function getHasOrder(id) {
  const data = {
    fromId: id
  }
  return request({
    url: `${config.host}/ApiOrders/HasOrder`,
    data
  })
}