// pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    cityType:""
  },

  onLoad: function (options) {
    var that = this
    //获取补贴城市列表
    this.loadSubsidyCity(function(req){
      if(req != false){
        that.loadInfo(function(rb){
          if (rb != false){
            //获得一个三维城市数组
            //定位的名字
            var currentCity = that.data.city
            //显示的名字 
            var provice
            var cityType
            for (var i = 0; i < req.data.length; i++) {
              if (currentCity == req.data[i].province.name){
                provice = req.data[i].province.name
                cityType = req.data[i].province.type
              }
            }
            //保存住城市 和 类别
            that.setData({
              city: provice,
              cityType: cityType
            })

          }
        })
      }
    })
  },

  loadSubsidyCity: function (cb) {
    var that = this
     wx.request({
       url: 'https://care-dev.zlycare.com/1/drugAllowance/searchCityList',
       data: {},
       header: {
         'Content-Type': 'application/json'
       },
       success: function (res) {
         typeof cb == "function" && cb(res.data)
       },
       fail: function () {
         // fail 
         typeof cb == "function" && cb(false)
       },
       complete: function () {
         // complete 
       }
     })
  },

  loadInfo: function (rb) {
    var page = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success 
        var longitude = res.longitude
        var latitude = res.latitude
        //根据经纬度获取地理位置
        page.loadCity(longitude, latitude, rb)
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  },
  loadCity: function (longitude, latitude, rb) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=KdK8T73vYijaXWCYGoG7Gb5ujzSe9DDE&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        page.setData({ city: city });
        typeof rb == "function" && rb(true)
      },
      fail: function () {
        // fail 
        typeof rb == "function" && rb(false)
      },
      complete: function () {
        // complete 
      }
    })
  },
  //扫码入口
  scanCode: function () {
    var that = this
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ["qrCode"],
      success: function (res) {
        //利用接口去掉扫码药品数据
        //请求报销列表
        console.log(res.result)
        wx.request({
          url: 'https://care-dev.zlycare.com/1/drugAllowance/searchDrug?type=' + that.data.cityType + '&name=' + that.data.city + '&barCode=' + res.result,
          data: '',
          header: {
            'Content-Type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            //弹出提示药品不在补贴
            if(res.data.code != '200'){
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                image: '',
                duration: 2000,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }else{
              //成功的药品补贴
              
            }
          },
          fail: function(res) {
           
          },
          complete: function(res) {},
        })
      },
      fail: function (res) { 
      },
      complete: function (res) { },
    })
  }
})