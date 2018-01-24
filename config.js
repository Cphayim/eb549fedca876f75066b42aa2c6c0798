/**
 * 全局配置文件
 * @Author Cphayim
 */

export default {

  appid: 'wxce8d2df41f6db25d',

  // 请求主机名
  host: 'https://ssl.api.vcar360.com',

  // 成功响应的 errorcode
  ERR_OK_CODE: 0,

  // 页面配置项
  pageOpt: {
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
}


