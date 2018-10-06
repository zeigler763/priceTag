//logs.js
const util = require('../../utils/util.js')
const QR = require('../../utils/qrcode.js')

var time = null
var contentaddArray = [{ title: "刘鑫", price: "110", distance: "20" },
{ title: "于世民", price: "120", distance: "120" },
{ title: "哈哈", price: "130", distance: "220" },
{ title: "郝峰", price: "140", distance: "320" },
{ title: "刘鑫", price: "160", distance: "20" },
{ title: "王鹏", price: "10.27", distance: "20" },
{ title: "张小彬", price: "120", distance: "120" },
{ title: "蒋政", price: "130", distance: "210" },
{ title: "杨欢", price: "10.22", distance: "260" },
{ title: "马强", price: "10.34", distance: "220" },
{ title: "裘区英", price: "10.52", distance: "210" },
{ title: "刘鑫", price: "10.90", distance: "220" }]

Page({
  data: {
    // 自定义page对象CSS样式对象
    array:[{title:"刘鑫",price:"110",distance:"20"},
          {title:"于世民",price:"120",distance:"120"},
          {title:"哈哈",price:"130",distance:"220"},
          {title:"郝峰",price:"140",distance:"320"},
          {title:"刘鑫",price:"160",distance:"20"},
          {title:"王鹏",price:"10.27",distance:"20"},
          {title:"张小彬",price:"120",distance:"120"},
          {title:"蒋政",price:"130",distance:"210"},
          {title:"杨欢",price:"10.22",distance:"260"},
          {title:"马强",price:"10.34",distance:"220"},
          {title:"裘区英",price:"10.52",distance:"210"},
          {title:"刘鑫",price:"10.90",distance:"220"}],
    placeholder:"www.baidu.com"
  },
  onLoad: function () { 
  
  },

  onReady: function () {
    
  },

  onShow: function (){
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },

  creatCode: function (){
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },

  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  formSubmit: function (e) {
    var that = this;
    var url = e.detail.value.code;
    that.setData({
      maskHidden: false,
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000
    });
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url, "mycanvas", size.w, size.h);
      that.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 2000)

  },


  onReachBottom: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var that = this
    var addArray = this.data.array
    addArray = addArray.concat(contentaddArray)
    console.log(addArray)
    this.setData({
      array:addArray
    })
    setTimeout(function(){
      wx.showToast({
        title: '成功'
      })
    },3000
    )
  },
  // 改变背景颜色
  changeColor: function () {
    var bgColor = this.data.pageBackgroundColor == 'red' ? '#5cb85c' : 'red';
    // 设置背景颜色数据
    this.setData({
      pageBackgroundColor: bgColor
    });
  },

  scanCode: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ["qrCode"],
      success: function(res) {
        console.log(res)
        wx.showModal({
          title: res.result,
          content: '这是一个窗口',
          showCancel: true,
          cancelText: '',
          cancelColor: '',
          confirmText: '确认',
          confirmColor: '#999999',
          success: function(res) {
            if(res.confirm){

            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})