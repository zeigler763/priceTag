// pages/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     ulli:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickHeader: function(e){
      //用来传递值
      this.triggerEvent('myevent', { title : e.currentTarget.dataset.title, index : e.currentTarget.dataset.index })
    }
  }
})
