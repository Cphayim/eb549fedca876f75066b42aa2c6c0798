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
    needAuth: false // 是否需要授权
  },
  'mine': { // 我的
    needAuth: true
  },
  'hot-store': { // 热卖商城列表
    needAuth: false
  },
  'store-detail': { // 商品详情
    needAuth: false
  },
  'submit-order': { // 提交订单
    needAuth: true
  },
  'confirm-order': { // 确认订单
    needAuth: true
  },
  'order-detail': { // 订单详情
    needAuth: true
  },
  'register-detail': { // 报名详情
    needAuth: true
  },
  'success': { // 支付/报名成功
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
  if (page.needAuth) {
    flag = true
  }
  return flag
}.bind(_pageOpt)