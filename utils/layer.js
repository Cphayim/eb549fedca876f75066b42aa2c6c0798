// 显示等待提示
const showLoading = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

const showError = text => wx.showToast({
  title: text,
  icon: 'error'
})

// 显示失败提示
const showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}




export const toast = {
  showLoading,
  showSuccess,
  showError
}

export const modal = {
  show: showModel
}