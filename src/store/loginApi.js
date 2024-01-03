import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const loginApi = createApi({
  reducerPath: 'loginApi',  // Api的标识,不能与其他的Api或reducer重复
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/'  // 基础请求路径
  }),  // 指定查询的基础信息(发送请求使用的工具,默认方式:fetchBaseQuery)
  endpoints(build) {
    // build 是请求的构建器,通过build来设置请求的相关信息
    return {
      postLogin: build.mutation({
        query({username,password}) {
          return {
            url: 'login',
            method: 'POST',
            body: {
              username,
              password
            }
          }
        }
      }),
    }
  }  // endpoints() 用来指定Api中的各种功能,是一个方法,他需要一个对象作为返回值
})


export const {
  usePostLoginMutation
} = loginApi

export default loginApi