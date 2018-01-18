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

/**
 * 获取热卖商城列表数据
 * @method getBannerList
 * @return Promise.state
 */
export function getGoodsList({PageSize = 10, KeyStr = ''}) {
  const data = {
    PageSize,
    PageNo: 1,
    OrderBy: 'IsTop DESC,SortIndex ASC,IsEnd ASC,CreateTime DESC',
    TenantId: 340,
    CatalogKey: KeyStr,
    KeyStr
  }

  return request({
    url: `${config.host}/ApiArticles/ReadForShop`,
    data
  })
}