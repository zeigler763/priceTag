Component({

  behaviors: [],
  externalClasses:['my-class'],

  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'haha', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: "_myPropertyChange"
      // observer: function (newVal, oldVal) { 
      //   console.log(newVal, oldVal)
      // } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    myPropertyTow: String // 简化的定义方式
  },
  data: {
    name:"yushimin"
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _myPropertyChange: function (newVal, oldVal) {
      // console.log(newVal,oldVal)
    },

    onTap: function (e) {
      console.log(e)
      // var myEventDetail = {} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent("onDown", {}, { bubbles: false})
     
    }
  }

})