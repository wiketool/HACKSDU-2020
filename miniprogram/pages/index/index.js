//index.js
const app = getApp()
var title
var time
var star
var idname
var Y
var date
var M
var D
var Y2
var M2
var D2
var abcd
Page({
  data: {
    ddl:'',
    name:'',
    current:0,
    index:0,
    type: 1,
    startYear: 1980,
    endYear: 2030,
    cancelColor: "#888",
    color: "#5677fc",
    setDateTime: "",
    result: "",
    abcd:'',
    time:''
  },
  onReady: function (options) {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
  },
  //显示日期选择器
  show:function (e) {
    let type = Number(e.currentTarget.dataset.type);
    this.setData({
      cancelColor: "#888",
      color: "#5677fc",
      setDateTime:"",
      startYear: 1980,
      endYear: 2030
    })
    switch (type) {
      case 1:
        this.setData({
          type:2
        })
        break;
      case 2:
        this.setData({
          type: 3
        })
        break;
      case 3:
        this.setData({
          type: 4
        })
        break;
      case 4:
        this.setData({
          type: 1
        })
        break;
      case 5:
        this.setData({
          type: 1,
          setDateTime:"2019-09-12 18:01"
        })
        break;
      case 6:
        this.setData({
          type: 1,
          startYear: 2019,
          endYear: 2021
        })
        break;
      case 7:
        this.setData({
          type: 1,
          cancelColor: "#555",
          color: "#e41f19"
        })
        break;
      default:
        break;
    }
    this.dateTime.show();
  },
  // 得到用户openid
  getopenid(){
    wx.cloud.callFunction({
      name:"openid"
    }).then(
      res=>{
        idname = res.result.openid
        console.log("获取openID成功",idname)
    }).catch(res=>{
      console.log("获取openID失败",res)
  })
},
  // 以下函数实现ddl标题的增加
  title:function(e){
    title = e.detail.value
  },
  // 增加ddl
  addddl:function(){
    if (!(star =='0' && time=='0' && title=='0')) {
      const db = wx.cloud.database()
    db.collection("ddlist").add({
      data:{
        title:title,
        time:time,
        star:star,
      },
    })
    wx.showToast({
      title: '增加记录成功',
    })
    this.setData({
      name:'',
      abcd:'',
      time:'',
      index:0
    })
    }else {
      wx.showToast({
        title: '非法输入',
        icon:'none'
      })
    }
      star = 0,
      time = '0'
      title = '0'
  },

// 以下函数实现查找ddl
findddl:function(){
  const db = wx.cloud.database()
  db.collection('ddlist').where({
    _openid: idname
  }).get({
    success: res => {
      this.setData({
        ddl: res.data
      })
      wx.showToast({
        title: '查询记录成功',
      })
    },
  })
  star = '0',
  time = '0'
  title = '0'
},
// 点击时间选择器的确定后设置时间
change3:function(e){
  time = e.detail.result
  this.setData({
    time:e.detail.result
  })
},
// 选择星星
  change:function(e){
    star = e.detail.index
    this.setData({
      current:e.detail.index,
      index:e.detail.index
    })
  },
shouquan(){
  wx.requestSubscribeMessage({
    tmplIds: ['dOlD7HgpTmQmGzHOjxttfVdnK96tc7tr7XVuG4ecAyk'],
    success(res){
      console.log('授权成功',res)
    },
    fail(res){
      console.log('授权失败',res)
    }
  })
},
// 计算剩余天数
findtime:function(){
  var timestamp2 = Date.parse(time);
  timestamp2 = timestamp2 / 1000;
  console.log("当前时间戳为：" + timestamp2);
  var n = timestamp2 * 1000;
  date = new Date(n);
  //年  
  Y2 = date.getFullYear();
  //月  
  M2 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  D2 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  console.log("当前时间：" + Y + M + D );
  this.setData({
    abcd:D2-D+(M2-M)*30+(Y2-Y)*365
  })
  abcd = D2-D+(M2-M)*30+(Y2-Y)*365
},
onLoad: function(options) {
  //获取当前时间戳  
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  //获取当前时间  
  var n = timestamp * 1000;
  date = new Date(n);
  //年  
  Y = date.getFullYear();
  //月  
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  // 获取当前用户opendi
  wx.cloud.callFunction({
    name:"openid"
  }).then(
    res=>{
      idname = res.result.openid
      console.log("获取openID成功",idname)
  }).catch(res=>{
    console.log("获取openID失败",res)
  })
},
tuisong(){
  wx.cloud.callFunction({
    name:"fasong1",
    data:{
     openid:idname,
     na1:"2020/11/29",
     na2:abcd,
     na3:"ddl保质期"
    }
  }) .then(res=>{
   console.log("发送成功",res)
 }).catch(res=>{
   console.log("发送失败",res)
 })
 
 }
})
exports.main = (event, context) => {
  const OPENID = cloud.getWXContext()
}



