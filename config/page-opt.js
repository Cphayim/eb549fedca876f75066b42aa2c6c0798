/**
 * 页面选项配置
 * @Author Cphayim
 */
import { queryString } from '../utils/url.js'

/**
 * 配置项
 * 外部通过方法访问该对象
 */
const _pageOpt = {
  'home': { // 首页
    url: '/pages/home/home',
    needAuth: false, // 是否需要授权
  },
  'mine': { // 我的
    url: '/pages/mine/mine',
    needAuth: true
  },
  'hot-store': { // 热卖商城列表
    url: '/pages/hot-store/hot-store',
    needAuth: false
  },
  'store-detail': { // 商品详情
    url: '/pages/store-detail/store-detail',
    needAuth: true
  },
  'submit-order': { // 提交支付订单
    url: '/pages/submit-order/submit-order',
    needAuth: true,
    shareType: 'home'
  },
  'submit-register': { // 提交报名订单
    url: '/pages/submit-register/submit-register',
    needAuth: true,
    shareType: 'home'
  },
  'confirm-order': { // 确认订单
    url: '/pages/confirm-order/confirm-order',
    needAuth: true,
    shareType: 'home',
  },
  'order-detail': { // 订单详情
    url: '/pages/order-detail/order-detail',
    needAuth: true,
    shareType: 'home'
  },
  'enroll-detail': { // 报名详情
    url: '/pages/enroll-detail/enroll-detail',
    needAuth: true,
    shareType: 'home'
  },
  'success': { // 支付/报名成功
    url: '/pages/success/success',
    needAuth: true,
    shareType: 'home'
  },
  'web-view': { // web-view 容器
    url: '/pages/web-view/web-view',
    needAuth: false,
    shareType: 'home'
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

/**
 * 获取分享路径
 * @function getShareUrl
 * @return string
 */
export const getShareUrl = function (pageName) {
  const page = this[pageName] || this['home']
  let shareUrl = ''

  // 配置为返回首页
  if (page.shareType === 'home') {
    shareUrl = this['home'].url
  }
  // 配置为自定义
  else if (page.shareType === 'custom') {
    shareUrl = page.shareUrl ? page.shareUrl : this['home'].url
  }
  // 未配置 shareType 或配置为 'current' 或无效配置, 跳转到当前页
  else {
    const currentPages = getCurrentPages()
    const currentPage = currentPages[currentPages.length - 1]
    shareUrl = currentPage.route + queryString(currentPage.options)
  }
  return shareUrl
}.bind(_pageOpt)