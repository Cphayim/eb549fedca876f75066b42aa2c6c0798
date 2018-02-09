/**
 * 我的 API
 * @Author Cphayim
 */
import config from '../config.js'
import { request } from '../utils/request.js'

/**
 * 获取'我'的信息
 * @method getMyInfo
 * @return Promise.state
 */
export function getMyInfo() {
  return request({
    url: `${config.host}/ApiQRcodeItems/EnrollList`
  })
}