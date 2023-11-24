/*
*   发送异步请求的函数模块
*     优化:
*       1.统一处理请求异常
* */

import axios from "axios";


export default function ajax(url, data = {}, type = 'GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {  // 发送post请求
      promise = axios.post(url, data)
    }
    // 2.如果成功了,调用resolve(value)
    promise.then(response => {
      resolve(response.data)
      // 3.如果失败了,不调用reject(reason),而是提示异常信息
    }).catch(err => {
      // message.error('请求出错了:' + err.message)
      console.log(err.message)
    })
  })


}


// 登陆请求接口
// ajax('/login',{username:'Tom',password:'12345'},'POST').then()