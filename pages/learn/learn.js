// pages/learn/learn.js
Page({
  data: {
    x: 0,
    y: 0
  },
  clickTextField: function(){
    wx.navigateTo({
      url: '../input/input',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  clickTextView: function(){
    wx.navigateTo({
      url: '../textView/textView',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  clickDetails: function(){
    wx.navigateTo({
      url: '../subsidyDetails/subsidyDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  clickAnimate: function(){
    wx.navigateTo({
      url: '../animate/animate',
    })
  }
 
})