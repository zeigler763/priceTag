//index.js
//获取应用实例
const app = getApp()
var index = 0;
var that;
Page({
  data: {
    nickName: '',
    avatarUrl: '/images/default_avart.png',
    pageCount: 10,
    classes: ["全部", "家具", "书桌", "电脑耗材", "音响设备", "好友推荐"],
    currentTab: 0, // 导航栏切换索引
    //卡片数据
    cards: [
      { title: "卧室家具", price: "时尚简约时尚简约时尚简约时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬机了萨芬机了萨芬机了萨芬", onStar: true, isFlag: true },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: true, isFlag: true },
      { title: "音响设备", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: true, isFlag: false },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，开行不得发动机了萨芬", onStar: true, isFlag: false },
      { title: "卧室家具", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬机了萨芬机了萨芬机了萨芬", onStar: false, isFlag: true },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: false, isFlag: true },
      { title: "音响设备", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: false, isFlag: true },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，开行不得发动机了萨芬", onStar: false, isFlag: true },
      ],
  },
  onLoad: function () {
    that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
      fail:res =>{
        console.log('haha');
      }
    })
  },

  clickStar: function (e) {
    that = this
    var index = e.currentTarget.dataset.index
    var cards = that.data.cards
    var star = "cards["+index +"].onStar"
    this.setData({
      [star]: !cards[index].onStar
    })
  },

  clickCell: function (e) {
    var index = e.currentTarget.dataset.index
    var cards = that.data.cards
    var star = "cards[" + index + "].isFlag"
    this.setData({
      [star]: !cards[index].isFlag
    })
  },

  clickSearchCode: function () {
    console.log('点击了二维码');
  },

  clickHeaderClass: function (ev) {
    this.setData({ currentTab: ev.currentTarget.dataset.index });
  }
})
