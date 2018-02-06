/**
 * 页面选项配置
 * @Author Cphayim
 */

/**
 * 配置项
 * 外部通过方法访问该对象
 */
const _pageOpt = {
  'home': { // 首页
    url: '/pages/home/home',
    needAuth: false // 是否需要授权
  },
  'mine': { // 我的
    url: '/pages/mine/mine',
    needAuth: true
  },
  'hot-store': { // 热卖商城列表
    url: '/pages/hot-store/hot-store',
    needAuth: true
  },
  'store-detail': { // 商品详情
    url: '/pages/store-detail/store-detail',
    needAuth: true
  },
  'submit-order': { // 提交订单
    url: '/pages/submit-order/submit-order',
    needAuth: true
  },
  'confirm-order': { // 确认订单
    url: '/pages/confirm-order/confirm-order',
    needAuth: true
  },
  'order-detail': { // 订单详情
    url: '/pages/order-detail/order-detail',
    needAuth: true
  },
  'register-detail': { // 报名详情
    url: '/pages/register-detail/register-detail',
    needAuth: true
  },
  'success': { // 支付/报名成功
    url: '/pages/success/success',
    needAuth: true
  }
}

/**
 * 获取页面是否需要鉴权
 * @function getNeedAuth
 * @return boolean
 */
export const getNeedAuth = function (pageName) {
  const page = this[pageName]
  let flag = false
  if (page && page.needAuth) {
    flag = true
  }
  return flag
}.bind(_pageOpt)

/**
 * 获取页面路径
 * @function getNeedAuth
 * @return string
 */
export const getPageUrl = function (pageName) {
  const page = this[pageName] || this['home']
  return page.url
}.bind(_pageOpt)