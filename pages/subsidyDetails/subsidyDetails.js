var longitude;
var latitude;

Page({
   /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:[],
    buttonHidden:false,
    pictureWidth:50,
    city: "",
    cityType: "",
    array: [],
    drugArray: [],
    channelName:"请选择药店/医院>",
    hiddenModal:true
  },

  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    var name = this.data.array[e.detail.value].name
    this.setData({
      channelName: name
    });
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取屏幕宽度和高度 
    var pictureW = (wx.getSystemInfoSync().windowWidth - 10*6)/4
    this.setData({
      pictureWidth:pictureW
    })

    var that = this
    //获取补贴城市列表
    this.loadSubsidyCity(function (req) {
      if (req != false) {
        that.loadInfo(function (rb) {
          if (rb != false) {
            //获得一个三维城市数组
            //定位的名字
            var currentCity = that.data.city
            //显示的名字 
            var provice
            var cityType
            for (var i = 0; i < req.data.length; i++) {
              if (currentCity == req.data[i].province.name) {
                provice = req.data[i].province.name
                cityType = req.data[i].province.type
                // provice = ""
                // cityType = ""
              }
            }
            //请求渠道列表
            that.getCityChannels(provice,cityType)
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  deleteImage: function (e) {
    var that = this
    //移除数组中对应的图片
    var pictures = that.data.avatarUrl
    var index = e.currentTarget.dataset.index
    pictures.splice(index, 1)
    that.setData({
      avatarUrl:pictures,
      buttonHidden:pictures.length >= 8
    })
  },

  clickImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.avatarUrl;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
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
        longitude = res.longitude
        latitude = res.latitude

        //获取最近渠道
        page.getNearbyChannel(latitude,longitude)
        //根据经纬度获取地理位置
        page.loadCity(longitude, latitude, rb)
        //保存经纬度
        
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
        wx.request({
          url: 'https://care-dev.zlycare.com/1/drugAllowance/searchDrug?type=' + that.data.cityType + '&name=' + that.data.city + '&barCode=' + res.result,
          data: '',
          header: {
            'Content-Type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            //弹出提示药品不在补贴
            if (res.data.code != '200') {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                image: '',
                duration: 2000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              //成功的药品补贴
              console.log(res.data.items[0])
              var drugs = that.data.drugArray
              drugs.push(res.data.items[0])
              that.setData({
                drugArray:drugs
              })
            }
          },
          fail: function (res) {

          },
          complete: function (res) { },
        })
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  },

  bindViewTap: function () {
    var that = this;
    //剩余可添加数量
    var lenth = that.data.avatarUrl.length
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 8-lenth,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        //获取到当前地址列表
        var currentFilePaths = that.data.avatarUrl;
        var pictures = currentFilePaths.concat(tempFilePaths)
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          avatarUrl: pictures,
          buttonHidden: pictures.length >= 8
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //获取最近渠道
  getNearbyChannel: function (latitude, longitude){
    var that=this
    wx.request({
      url: 'https://care-dev.zlycare.com/1/drugAllowance/nearest_channel?location=' + latitude + ',' + longitude,
      data: '',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          channelName:res.data.name
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取城市下所有渠道
  getCityChannels: function (cityName, cityType) {
    var that = this
    wx.request({
      url: 'https://care-dev.zlycare.com/1/drugAllowance/searchDrugChannel?type=' + cityType + '&name=' + cityName,
      data: '',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          array:res.data.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //显示补贴图片
  showShareImage: function(){
    this.setData({
      hiddenModal: !this.data.hiddenModal
    })
  }
})