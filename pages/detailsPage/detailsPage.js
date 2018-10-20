// pages/detailsPage/detailsPage.js
let app = getApp();

var that;

Page({

  data: {
    // tab切换
    currentTab: 0,
    imgheights: 0,
    //是否是iphoneX
    isIpX: app.globalData.isIpX?"30rpx":"0rpx",
    imgUrls:[
      "http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg",
      "http://pic24.photophoto.cn/20120923/0005018332564487_b.jpg",
      "http://pic.58pic.com/58pic/14/05/71/82v58PICBuM_1024.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.isIpX)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickBannerTag: function (e) {
    that = this;
    var currentImg = that.data.imgUrls[e.currentTarget.dataset.index]
    wx.previewImage({
      current: currentImg,
      urls: that.data.imgUrls,
    })
  },

  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights += imgheight
    this.setData({
      imgheights: imgheights,
    })
  }

})