// pages/myRemark/myRemark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: [],
    buttonHidden: false,
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

  deleteImage: function (e) {
    var that = this
    //移除数组中对应的图片
    var pictures = that.data.avatarUrl
    var index = e.currentTarget.dataset.index
    pictures.splice(index, 1)
    that.setData({
      avatarUrl: pictures,
      buttonHidden: pictures.length >= 9
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

  bindViewTap: function () {
    var that = this;
    //剩余可添加数量
    var lenth = that.data.avatarUrl.length
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 9 - lenth,
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
          buttonHidden: pictures.length >= 9
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

  //点击了提交
  clickSubmit: function () {
    console.log('点击了提交')
  }
})