/**
 * layer 模块
 * @Author Cphayim
 */

/**
 * toast
 */
export const toast = {
  /**
   * 显示等待
   * @method loading
   * @param {string} text 显示文字 [default='加载中...']
   */
  loading(text = '加载中...') {
    wx.showToast({
      title: text,
      icon: 'loading',
      duration: 60000
    })
  },
  /**
   * 显示成功
   * @method success
   * @param {string} text 显示文字 [default='']
   */
  success(text = '') {
    wx.showToast({
      title: text,
      icon: 'success',
      duration: 3000
    })
  },
  /**
   * 隐藏
   * @method hide
   */
  hide() {
    wx.hideToast()
  }
}

/**
 * modal
 */
export const modal = {

  /**
   * 显示 alert 弹窗
   * @param {object} opts
   * @param {string} opts.title
   * @param {string} opts.content
   * @param {string} opts.confirmText
   * @return Promise.state
   */
  alert({
    title = '提示',
    content = '提示内容',
    confirmText = '确认'
    }) {
    return _showModal({
      title,
      content,
      showCancel: false,
      confirmText
    })
  },

  /**
   * 显示 confirm 弹窗
   * @param {object} opts
   * @param {string} opts.title
   * @param {string} opts.content
   * @param {string} opts.confirmText
   * @param {string} opts.cancelText
   * @return Promise.state
   */
  confirm({
    title = '提示',
    content = '提示内容',
    confirmText = '确认',
    cancelText = '取消'
  }) {
    return _showModal({
      title,
      content,
      confirmText,
      cancelText
    })
  }
}

function _showModal({
  title = '提示',
  content = '提示内容',
  showCancel = true,
  cancelText = '取消',
  cancelColor = '#333',
  confirmText = '确认',
  confirmColor = '#3CC51F'
}) {
  // 隐藏 toast 层
  toast.hide()
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      // 用户点击确定按钮返回 Promise.resolve(true)
      // 用户点击取消或点击遮罩层(安卓)返回 Promise.reject(false)
      success: res => resolve(res.confirm),
      fail: err => reject(err)
    })
  })
}