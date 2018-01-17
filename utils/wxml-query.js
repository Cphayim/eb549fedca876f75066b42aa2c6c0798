/**
 * WXML 节点查询模块
 * @Author Cphayim
 */

/**
 * 获取单个节点信息
 * 返回查询的到第一个信息
 * @function $$
 * @param {string} selector 选择器名
 * @param {object} [_this]  组件上下文
 * @return Promise.state
 */
export function $$(selector, _this = null){
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    if (_this) {
      // 将选择器的选取范围更改为自定义组件
      query.in(_this)
    }
    query.select(selector).boundingClientRect(function (res) {
      resolve(res)
    }).exec()
  })
}

/**
 * 获取多个节点信息
 * 返回查询到的节点信息数组
 * @function $$$
 * @param {string} selector 选择器名
 * @param {object} [_this]  组件上下文
 * @return Promise.state
 */
export function $$$(selector, _this = null) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    if(_this){
      // 将选择器的选取范围更改为自定义组件
      query.in(_this)
    }
    query.selectAll(selector).boundingClientRect(function (res) {
      resolve(res)
    }).exec()
  })
}