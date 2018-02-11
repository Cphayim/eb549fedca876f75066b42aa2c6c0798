/**
 * enroll-detail api
 * @Author Cphayim
 */
import { request } from '../utils/request.js'
import config from '../config.js'

/**
 * 获取报名券数据
 * @function getEnrollDetail
 * @param {object} data
 * @return Promise.state
 */
export function getEnrollDetail(data) {
  return request({
    url: `${config.host}/ApiQRcodeItems/EnrollDetail`,
    data
  })
}