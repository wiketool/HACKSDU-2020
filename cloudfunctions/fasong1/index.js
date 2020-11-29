// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数


  exports.main = async (event, context) => {
    try{
      const result = await cloud.openapi.subscribeMessage.send({
        touser:event.openid,
        page:'/miniprogram/pages/index',
        data:{
          date1:{
            value:event.na1
          },
          number2:{
            value:event.na2
          },
          thing3:{
            value:event.na3
          }
        },
        templateId:'dOlD7HgpTmQmGzHOjxttfVdnK96tc7tr7XVuG4ecAyk'
      })
      console.log(result)
      return result
    }
    catch (err){
      console.log(err)
      return err
    }
  }
