/**
 * 热卖商城请求 API
 * @Author Cphayim
 */

import config from '../config.js'
import {request} from '../utils/request.js'

export function getHotTabInfo(){
  return request({
    url: `${config.host}/ApiArticles/ReadForSubKeys`
  })
}