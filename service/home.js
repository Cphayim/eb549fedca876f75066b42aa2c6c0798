/**
 * 首页请求API
 * @Author Cphayim
 */

import config from '../config.js'
import { request } from '../utils/request.js'

/**
 * 获取经销商信息
 * @function getDealerInfo
 * @return Promise.state
 */
export function getDealerInfo(){
  const data = {}
  return request({
    url: `${config.host}/Org/Tenants/Detail`,
    data
  })
}

/**
 * 获取首页轮播图数据
 * @function getBannerList
 * @return Promise.state
 */
export function getBannerList() {
  const data = {
    Top: 5,
    RecommendType: 1,
    Status: 1,
    OrderBy: 'Status asc, SortIndex asc, Id DESC, PublishTime DESC',
    TenantId: 340
  }

  return request({
    url: `${config.host}/Car/HotRecommends/Read`,
    data
  })
}

/**
 * 获取首页热卖商城 TOP 数据
 * @function getBannerList
 * @return Promise.state
 */
export function getTopGoodsList(size = 3) {
  const data = {
    PageSize: size,
    PageNo: 1,
    OrderBy: 'IsTop DESC,SortIndex ASC,IsEnd ASC,CreateTime DESC',
    TenantId: 340,
    CatalogKey: 'ShopAll',
    KeyStr: 'Shop_NewCar,Shop_UsedCar,Shop_Product,Shop_Service,Shop_Insurance'
  }
  
  return request({
    url: `${config.host}/ApiArticles/ReadForShop`,
    data
  })
}