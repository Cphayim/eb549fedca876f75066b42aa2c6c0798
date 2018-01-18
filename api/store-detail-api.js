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
