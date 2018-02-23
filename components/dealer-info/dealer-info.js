// components/dealer-info/dealer-info.js
/**
 * 经销商信息组件
 * @Category 业务组件
 * @Author Cphayim
 */
import { toast, modal } from '../../utils/layer.js'
import config from '../../config.js'
import { request } from '../../utils/request.js'


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 拨打电话
     */
    callPhone(e) {
      const { phone } = e.currentTarget.dataset
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
        })
      } else {
        modal.alert({ content: '商家未提供联系电话' })
      }
    },
    /**
     * 打开地图
     */
    openMap() {
      toast.loading('正在打开地图')
      const { Latitude, Longitude } = this.data.info
      request({
        url: `${config.host}/tool/locations/MapGPS?location=${Latitude},${Longitude}&key=RSQBZ-J6L3U-OJGVH-4GLLV-WLLXO-VEFFE&resulttype=jsonapi`
      }).then(({ data }) => {
        toast.hide()
        const { locations: [location] } = data
        wx.openLocation({
          latitude: location.lat,
          longitude: location.lng,
          name: this.data.info.Name,
          address: this.data.info.Address,
          scale: 15
        })
      })

    }
  }
})
