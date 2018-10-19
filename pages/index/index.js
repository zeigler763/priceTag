//index.js
//获取应用实例
const app = getApp()
var index = 0;
var that;
Page({
  data: {
    duration:'300',
    scrollLeft:0,
    menuTop:0,
    menuFixed:false,
    winHeight:'',
    nickName: '',
    avatarUrl: '/images/default_avart.png',
    pageCount: 10,
    classes: ["全部", "家具", "书桌", "电脑耗材", "音响设备", "好友推荐"],
    currentTab: 0, // 导航栏切换索引
    //卡片数据
    cards: [
      {
        title: "卧室家具", price: "时尚简约时尚简约时尚简约时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬机了萨芬机了萨芬机了萨芬", onStar: true, pics: [
          "http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg",
          "http://pic24.photophoto.cn/20120923/0005018332564487_b.jpg",
          "http://pic.58pic.com/58pic/14/05/71/82v58PICBuM_1024.jpg"
        ] },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: true, },
      { title: "音响设备", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: true, },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，开行不得发动机了萨芬", onStar: true, isFlag: false },
      { title: "卧室家具", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬机了萨芬机了萨芬机了萨芬", onStar: false, },
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: false, },
      {
        title: "音响设备", price: "时尚简约", des: "有温暖的灯光营造氛围，宽心，酣然入梦，扣人心魄，开行不得发动机了萨芬", onStar: false, pics: [
          "http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg",
          "http://pic24.photophoto.cn/20120923/0005018332564487_b.jpg",
          "http://pic.58pic.com/58pic/14/05/71/82v58PICBuM_1024.jpg"
        ]},
      { title: "书桌", price: "时尚简约", des: "有温暖的灯光营造氛围，开行不得发动机了萨芬", onStar: false, pics:[
        "http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg",
        "http://pic24.photophoto.cn/20120923/0005018332564487_b.jpg",
        "http://pic.58pic.com/58pic/14/05/71/82v58PICBuM_1024.jpg"
      ]},
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

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 200;
        that.setData({
          winHeight: calc
        });
      }
    });
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

  //点击了页面
  clickCell: function (e) {
    
  },

  clickSearchCode: function () {
    console.log('点击了二维码');
  },

  pageChange: function (e) {
    that = this;
    var current = e.detail.current;
    that.setData({
      currentTab:current
    })
    this.scrollToCenter(current)
  },

  //点击了页面header选项
  clickHeaderClass: function (ev) {
    that = this
    //设置滑动时间
    that.setData({
      duration:'0'
    })
    var scal = app.globalData.pxScal
    var index = ev.currentTarget.dataset.index;
    that.setData({ currentTab: index });
    this.scrollToCenter(index,function(){
      that.setData({
        duration: '300'
      })
    })
  },


  //滑动显示到中间
  scrollToCenter: function (index,fn) {
    var obj = wx.createSelectorQuery();

    obj.selectAll('#_title').boundingClientRect(function (rect) {

    }).select('#affix').fields({
      scrollOffset: true,
    }, function (res) {

    })
    obj.exec(function (res) {
      var rectW = res[0][index].width
      var rectLeft = res[0][index].left
      var scrollLeft = res[1].scrollLeft
      var offsetLeft = rectLeft + scrollLeft

      //当前中点离中线多远
      var scrollY = (offsetLeft + rectW / 2 - 375 / 2)
      that.setData({
        scrollLeft: scrollY
      })
      
      if(fn){
        fn()
      }
    });
  },

  scrollTop: function (e) {
    that = this
    that.data.scrollLeft = e.detail.scrollLeft
  },

  //跳到商品详情
  showGoodsDetails: function (e) {
    wx.navigateTo({
      url: '../detailsPage/detailsPage',
    })
  },

  //跳到添加理想价格
  clickToMyPrice: function () {
    wx.navigateTo({
      url: '../myPrice/myPrice',
    })
  },

  //跳转到我的备注
  clickToRemark: function () {
    wx.navigateTo({
      url: '../myRemark/myRemark',
    })
  },
  
})


