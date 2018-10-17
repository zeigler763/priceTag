// pages/detailsPage/detailsPage.js
let app = getApp();

var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  }

})