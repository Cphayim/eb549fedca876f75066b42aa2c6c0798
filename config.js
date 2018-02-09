/**
 * 全局配置文件
 * @Author Cphayim
 */
import * as pageOpt from './config/page-opt.js'
import error from './config/error.js'

export default {

  appid: 'wxce8d2df41f6db25d',

  // 最低要求的基础库版本
  supportSDKVersion: '1.9.0',

  // 请求主机名
  //host: 'http://340.dev.vcar360.com',
  host: 'https://shop.vcar360.com',
  //https://shopdev.vcar360.com

  // 成功响应的 errorcode
  ERR_OK_CODE: 0,

  // 页面配置项
  pageOpt: pageOpt,

  // 错误信息
  error,
}


