//index.js
//获取应用实例
const app = getApp()
var initData = 'this is first line \n this is second line'
var extraLine = [];
var index = 0;

Page({
  data: {
    ulli: ["于世民", "郝峰", "刘鑫", "毛海滨", "王鹏", "张小彬", "张琳","于世民","郝峰","刘鑫","毛海滨","王鹏","张小彬","张琳"],
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    text: initData,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        name: 'div',
        attrs: {
          class: 'div_class',
          style: 'color: yellow;'
        },
        children:[{
          type: 'text',
          text: 'Hello&nbsp;World!'
        }]
      },{
          name: 'div',
          attrs: {
            class: 'div_class',
            style: 'color: red;'
          },
          children: [{
            type: 'text',
            text: 'haha wowo haha!'
          }]
      }]
    }],
    word:"",
    storeWord:""
  },
  onLoad: function () {
    
  },


  keyword: function (e) {
    this.setData({
      word:e.detail.value
    })
  },

  requestSomething: function (e){
    var word = null
    if(e){
      //绑定给自己
      // word = e.currentTarget.dataset.keyword
      //直接操作数据
      word = this.data.word
    }
    console.log(word)
  },

  tap: function() {
    console.log('tap')
  },

  add: function (e) {
    extraLine.push('other line'+index)
    index ++
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      index --
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },

  clickTitle: function (e){
    wx.navigateTo({
      url: '../title/title?id=' + e.detail.title + '&index=' + e.detail.index,
    })
  },

  storeSearchWord: function (){
    wx.setStorage({
      key: 'storeWord',
      data: this.data.word,
    })
  },

  showSearchWord: function (){
    var that = this
    wx.getStorage({
      key: 'storeWord',
      success: function(res) {
        that.setData({
          storeWord:res.data
        })
      },
    })
  },

  shareImage: function (){
    wx.getImageInfo({
      src: 'https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c75c10385343fbf2cdfb712fb27eca8064388fe3.jpg',
      success: function(res) {
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage(res.path, 0, 0, 300, 500)

        // 作者名称
        ctx.setTextAlign('center')    // 文字居中
        ctx.setFillStyle('#ffffff')  // 文字颜色：黑色
        ctx.setFontSize(22)         // 文字字号：22px
        ctx.fillText("作者：一斤代码",150, 250)

        ctx.stroke()
        ctx.draw()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onGotUserInfo: function (e){
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  }

})
