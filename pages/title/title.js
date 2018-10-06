// pages/title/title.js
var title=""
var index=0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.id,
    })
    index=options.index
  },

  changeText: function(e){
    title = e.detail.value
  },

  changeTitle: function(e){
    if(title != ""){
      this.setData({
        title: title
      })
    }
    setTimeout(function(){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      var array = prevPage.data.ulli
      array[index] = currPage.data.title
      prevPage.setData({
        ulli: array
      })
      wx.navigateBack({})
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})